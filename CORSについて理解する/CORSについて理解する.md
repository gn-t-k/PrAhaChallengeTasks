# CORSについて理解する

## CORSとは

### 概要

Cross Origin Resource Sharingの略。

通常、ブラウザは同一オリジンポリシーによって、オリジンAの文書やスクリプトなどのリソースからオリジンBのリソースにはアクセスできないように制限されている。CORSは、追加のHTTPヘッダを使用することで、同一オリジンポリシーによるリソース間のアクセスの制限を緩和するためのブラウザの仕組み。XMLHttpRequestやFetch APIを使用してクロスドメインのリソースにリクエストを送信する場合は、CORSの仕様に則ってリクエストを送信する必要がある。

### 何を解決したか

Ajaxの普及により異なるオリジンのAPIを呼び出したいという需要が生まれたが、CORSの仕組みがないブラウザでは同一オリジンポリシーによって異なるオリジンのリソースへのアクセスは拒否されていた。こういった状況の中で、クロスドメインアクセスを実現したいという要求に答えるため考案されたのがCORS。CORSの規定に則ってブラウザとサーバーでアクセス制御に関する情報をやりとりすれば、安全にクロスドメインアクセスを実現ができる。

### CORSを使用したリクエストのシナリオ

CORSの仕様に則ってクロスドメインのリソースへアクセスする方法は2パターンがある。

- クロスドメインのリソースにアクセスするリクエストを直接送信する「**シンプルなリクエスト**」のパターン
- クロスドメインアクセスが可能か確認するリクエスト（**プリフライトリクエスト**）を送信して、そのレスポンスを受けた後に改めてクロスドメインのリソースアクセスを行うパターン

CORSで定義された条件を満たせばシンプルなリクエストが送信され、そうでなければプリフライトリクエストからやりとりが始まる。

#### シンプルなリクエスト

以下の条件をすべて満たすリクエストは、クロスドメインのリソースに直接送信できる。

- メソッドが以下のいずれかである。
  - GET
  - HEAD
  - POST
- 以下のHTTPヘッダ以外のHTTPヘッダが設定されていない（ブラウザによって自動的に追加されたものを除く）
  - Accept
  - Accept-Language
  - Content-Language
  - Content-type
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
- Content-Typeヘッダに以下の値以外の値が設定されていない
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain
- リクエストに使用されるどのXMLHttpRequestUploadにもイベントリスナーが登録されていない
- リクエストにReadableStreamオブジェクトが使用されていないこと

以下は、`https://foo.example`のコンテンツが`https://bar.other`にあるコンテンツを呼び出すときのコードの例。

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```

このとき送信されるリクエストは以下の通り。

```http
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

`Origin`ヘッダで`https://foo.example`からのリクエストであることをサーバーに伝えている。
サーバーから返ってくるレスポンスは以下の通り。

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML データ…]
```

`Access-Control-Allow-Origin`ヘッダで全てのドメインからのアクセスを許可することをクライアントに伝えている。サーバー側でリソースへのアクセスを制限したい場合、例えば以下のように設定すれば`https://foo.example`からのリクエストのみリソースへアクセスできるよう制限できる。

```http
Access-Control-Allow-Origin: https://foo.example
```

#### プリフライトリクエスト

シンプルなリクエストを送信できる条件に当てはまらない場合、クライアントはまずサーバーにプリフライトリクエストを送信する。例えば以下のように作成したリクエストは、`Content-Type`に`application/xml`を指定しているため、プリフライトリクエストが行われる。

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>');
```

プリフライトリクエストは、以下のようなOPTIONメソッドのリクエストである。

```http
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

以下の内容をサーバーに伝えている。

- `Origin`ヘッダで`https://foo.example`からのリクエストであること
- `Access-Control-Request-Method`ヘッダでPOSTメソッドを送信すること
- `Access-Control-Request-Headers`ヘッダで`X-PINGOTHER`, `Content-Type`をヘッダとして設定すること

プリフライトリクエストが成功した場合、以下のようなレスポンスがサーバーから返ってくる。

```http
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

`Access-Control-Allow-xxx`ヘッダで、許可するオリジン・メソッド・ヘッダを伝えている。

以上のようにプリフライトリクエストが完了したら、実際のリクエストを送る。

```http
POST /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>
```

レスポンスがサーバーから返ってくる。

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some XML payload]
```

#### CORSによってリクエストが失敗した場合

CORSによってリクエストが失敗した場合、ブラウザの開発者ツールのコンソールには下記のようなメッセージが表示される。

```plaintext
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://some-url-here. (Reason: additional information here).
```

以上のように、CORSによってリクエストが失敗したことは通知されるが、セキュリティ上の理由から詳細な原因は特定できないようになっている。

#### 認証情報を含むリクエストを送信する場合

異なるオリジン間でXMLHttpRequestまたはFetchによってCookieなどの資格情報を含むリクエストは、デフォルトでは送信されない。資格情報を含むリクエストを送信するためには、下記のようにフラグを設定する必要がある。

XMLHttpRequestの場合、`withCredentials`をtrueに設定する必要がある。

```javascript
const invocation = new XMLHttpRequest();
const url = 'http://bar.other/resources/credentialed-content/';

function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send();
  }
}
```

Fetchの場合、`credentials: 'include'`を設定する必要がある。

```javascript
fetch('http://bar.other/resources/credentialed-content/', {
  mode: 'cors',
  credentials: 'include'
}).then(onLoadFunc);
```

以上のような設定をした場合、以下のようなリクエストが作成・送信される。

```http
GET /resources/credentialed-content/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Referer: http://foo.example/examples/credential.html
Origin: http://foo.example
Cookie: pageAccess=2
```

リクエストが成功した場合、サーバーからは下記のようなレスポンスが返ってくる。

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:34:52 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 106
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

レスポンスを受信したクライアントは、`Access-Control-Allow-Credentials: true`が設定されているかどうかを確認する。設定されていなかった場合、レスポンスは無視される。また、`Access-Control-Allow-Origin`は明確にオリジンを指定せねばならず、ワイルドカード`*`が設定された場合、リクエストは失敗する。

## モックの実装

まず、クロスサイトのリクエストには`localhost:8081`からのリクエストしか受け付けないサーバーを実装する。
CORSに則ったHTTPヘッダを設定し、プリフライトリクエストが来た場合の扱いを定義したミドルウェアを実装。

```typescript
import { Request, Response, NextFunction } from "express";

const allowCrossDomain = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default allowCrossDomain;
```

ルーティングを定義したミドルウェアは特に工夫なく。

```typescript
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "success!!" });
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

export default router;
```

これらのミドルウェアをapp.useする。

```typescript
import express from "express";
import allowCrossDomain from "./allowCrossOrigin";
import router from "./router";
import staticPageServer from "./staticPageServer";

const app = express();
app.use(allowCrossDomain);
app.use(router);
app.listen(8080);

const staticPage = express();
staticPage.use(staticPageServer);
staticPage.listen(8081);
```

staticPageは、このサーバーにリクエストを送るモック。

```typescript
import express from "express";

const staticPageServer = express.static("public");

export default staticPageServer;
```

express.staticしてディレクトリ（ここでは`public`）を指定すると、指定したディレクトリ配下の静的コンテンツが配信できる。`public/index.html`を作成する。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CORSについて理解する</title>
  </head>
  <body>
    <p>CORSについて理解する</p>
    <button onclick="sendSimpleRequest()">シンプルなリクエストを送信する</button>
    <button onclick="sendPreflightRequest()">プリフライトリクエストを送信する</button>
    <script>
      const url = "https://494e29cf9cb7.ngrok.io"
      const sendSimpleRequest = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send();
      };

      const sendPreflightRequest = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      }
    </script>
  </body>
</html>
```

`url`には、ngrokで生成したURLを設定する。ngrokを使えば、簡単に別オリジンを再現できる。
localhost:8081で静的ページを表示すると、ボタンが2つ表示される。表示されたボタンをそれぞれクリックしてみて、開発者ツールのNetworkタブなどをみれば、シンプルなリクエストとプリフライトリクエストを使ったリクエストをそれぞれ確認できる。
