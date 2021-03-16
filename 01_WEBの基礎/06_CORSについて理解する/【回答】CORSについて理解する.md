# CORSについて理解する

## 課題1

### CORSの仕組みについて説明

通常、ブラウザは同一オリジンポリシーによって、オリジンAの文書やスクリプトなどのリソースからオリジンBのリソースにはアクセスできないように制限されている。CORSは、追加のHTTPヘッダを使用することで、同一オリジンポリシーによるリソース間のアクセスの制限を緩和するためのブラウザの仕組み。例えば、**access-control-allow-origin**ヘッダでアクセスを許可するオリジンを設定することができる。XMLHttpRequestやFetch APIを使用してクロスドメインのリソースにリクエストを送信する場合は、CORSの仕様に則ってリクエストを送信する必要がある。

CORSの仕様に則ってクロスドメインのリソースへアクセスする方法は2パターンがある。

- クロスドメインのリソースにアクセスするリクエストを直接送信する**simple request**のパターン
- クロスドメインアクセスが可能か確認するリクエスト（**preflight request**）を送信して、そのレスポンスを受けた後に改めてクロスドメインのリソースアクセスを行うパターン

CORSで定義された条件を満たせばシンプルなリクエストが送信され、そうでなければプリフライトリクエストからやりとりが始まる。

### CORSの仕組みがない場合生じる不具合

Ajaxの普及により異なるオリジンのAPIを呼び出したいという需要が生まれたが、CORSの仕組みがないブラウザでは同一オリジンポリシーによって異なるオリジンのリソースへのアクセスは拒否されていた。こういった状況の中で、クロスドメインアクセスを実現したいという要求に答えるため考案されたのがCORS。CORSの規定に則ってブラウザとサーバーでアクセス制御に関する情報をやりとりすれば、安全にクロスドメインアクセスを実現ができる。

### `Access-Control-Allow-Origin: *`を設定した場合に問題になるケース

資格情報を含むリクエストの場合、`Access-Control-Allow-Origin: *`を設定することはできないようになっている。設定した場合リクエストは失敗するため、明確にオリジンを指定する必要がある。

### 「シンプルなリクエスト」に該当するための条件

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

### サーバからのレスポンスのAccess-Control-Allow-Originヘッダーに、リクエスト送信元のオリジンが含まれない場合のブラウザの挙動

CORSによってリクエストが失敗した場合、ブラウザの開発者ツールのコンソールには下記のようなメッセージが表示される。

```plaintext
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://some-url-here. (Reason: additional information here).
```

以上のように、CORSによってリクエストが失敗したことは通知されるが、セキュリティ上の理由から詳細な原因は特定できないようになっている。

### クロスオリジンリクエストを発行する際に、クッキー情報を含むためには、何をする必要があるか

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

レスポンスを受信したクライアントは、`Access-Control-Allow-Credentials: true`が設定されているかどうかを確認する。設定されていなかった場合、レスポンスは無視される。また、`Access-Control-Allow-Origin`は明確にオリジンを指定せねばならず、ワイルドカード`*`が設定された場合、リクエストは失敗する。

## 課題2

### クイズ1

CORSでクッキーを送信する際に必要な設定について、XMLHttpRequestの場合とFetchの場合とで、それぞれ必要な設定は何でしょうか。

```javascript
// XMLHttpRequestの場合
const invocation = new XMLHttpRequest();
invocation.xxxxx = true;
invocation.send();
```

```javascript
// Fetchの場合
fetch('http://bar.other/resources/credentialed-content/', {
  mode: 'cors',
  yyyyy: 'include'
})
```

`xxxxx`と`yyyyy`に当てはまるプロパティ名を答えてください

<details>
  <summary>回答</summary>
  xxxxx … withCredentials <br />
  yyyyy … credentials
</details>

### クイズ2

`Content-Type`ヘッダに設定する値について、設定するとシンプルなリクエストで送信できなくなってしまう値は次のうちどれか

1. application/x-www-form-urlencoded
2. multipart/form-data
3. text/plain
4. application/xhtml+xml

<details>
  <summary>回答</summary>
  4. application/xhtml+xml
</details>

### クイズ3

HTTPのOPTIONメソッドの利用用途について、適切でないものは次のうちどれか

1. 許可されたリクエストメソッドの識別
2. CORSでのプリフライトクエスト
3. 対象リソースへのパスに沿ってメッセージのループバックテストを実行する

<details>
  <summary>回答</summary>
  適切でないものは3 <br/>

  1. `curl -X OPTIONS http://example.org -i`などとすると、許可されたリクエストメソッドを識別できる
  2. CORSのプリフライトリクエストはOPTIONSメソッドで送信する
  3. TRACEメソッドの説明

</details>

## 課題3

実装済み

## 課題4

### CURLで「シンプルなリクエスト」に該当したいPOSTリクエストを送信した場合、CORS制約は適用されるか、またその理由はなにか

適用されない。CORSはブラウザの仕組みであるため、プリフライトリクエストは送信されないため。
