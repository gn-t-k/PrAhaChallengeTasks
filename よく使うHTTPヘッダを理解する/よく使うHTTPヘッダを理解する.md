# よく使うHTTPヘッダを理解する

## HTTPヘッダの重要性

HTTPヘッダは、HTTPのメッセージボディに対する付加的な情報（いわゆるメタデータ）を表現するものです。クライアントやサーバーはHTTPのメッセージを受け取ったら、まずヘッダを見てボディに対する挙動を決定します。

リソースへのアクセス権を設定する認証、クライアントとサーバーの通信回数と量を節約するためのキャッシュなどはヘッダの情報があって実現する機能です。ヘッダの種類や扱い方を理解しておくことは、WEBサービスを扱う上で避けては通れないでしょう。

## 主要なHTTPヘッダ

### Host

HTTPリクエストが送信される先のサーバーのホスト名とポート番号を指定します。

```
Host: <host>:<port>
```

- `<host>` … サーバーのドメイン名 （例）example.jp
- `<port>` … 指定するポート番号（指定されなかった場合、HTTPSのURLであれば443、HTTPのURLであれば80とみなされる）

`Host`はすべてのリクエストメッセージで必ず指定する必要があります。

### Content-type

そのメッセージのボディの内容がどのような種類なのかを、MIME（Multipurpose Internet Mail Extensions）という電子メールの仕様から拝借してきた仕様を使って表現するヘッダです。

```
Content-Type: <type>/<subtype>; charaset=<charaset>
```

- `<type>/<subtype>` … メディアタイプ。MIMEの仕様。
- `<type>` … タイプ。リソースの表現の種類をざっくり指定する。RFC2046で9つ定義されている。（例）application
- `<subtype>` … サブタイプ。タイプに紐ついてリソースの表現の種類を詳細に指定する。（例）xhtml+xml
- `<charaset>` … リソースの文字エンコーディングの指定。省略可能。

タイプの一覧

| タイプ      | 意味                             | メディアタイプの例 |
| ----------- | -------------------------------- | ------------------ |
| text        | 人が読んで直接理解できるテキスト | text/plain         |
| image       | 画像データ                       | image/jpeg         |
| audio       | 音声データ                       | audio/mpeg         |
| video       | 映像データ                       | video/mp4          |
| application | その他のデータ                   | application/pdf    |
| multipart   | 複数のデータから成る複合データ   | multipart/related  |
| message     | 電子メールメッセージ             | message/rfc822     |
| model       | 複数次元で構成するモデルデータ   | model/vrml         |
| example     | 例示用                           | example/foo-bar    |

### User-agent

リクエストを行うユーザーエージェントソフトウェア（ウェブブラウザなどのこと）のOS、ベンダー、バージョンを識別するためのヘッダのことです。

```
User-Agent: <product>/<product-version><comment>
```

- `<product>` … 製品の識別子。（例）Mozilla
- `<product-version>` … 製品のバージョン情報。
- `<comment>` … 製品のより詳細な情報

例えばFirefoxのUser-agentは下記のようになります

```
Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0
```

- `Mozilla/5.0`は、Mozillaと互換性があるブラウザであることを示しています（現在はほぼすべてのブラウザで共通）
- `Windows NT 6.1; Win64; x64; rv:47.0`は、Windows7で動いていることを示しています。`rv`はGecko（後述）のバージョンです。
- `Gecko/20100101`は、HTMLレンダリングエンジンGeckoを搭載したブラウザであることを示しています（`20100101`は固定文字列）
- `Firefox/47.0`は、ブラウザーがFirefox47.0であることを示しています。

### Accept

メディアタイプや文字エンコーディングは、サーバーが一方的に決定するだけではなく、クライアントと交渉して決めることができ、この手法はコンテントネゴシエーションと呼ばれます。Acceptは、クライアントが処理できるデータの種類をサーバーに通知するヘッダです。

```
Accept: <type>/<subtype>,<type>/<subtype>, ..., <type>/<subtype>;q=<qvalue>,...
```

- `<type>/<subtype>` … クライアントが処理できるメディアタイプをMIMEタイプで伝えます。サーバーは、この提案のうち一つを選択します。
- `;q=<qvalue>` … メディアタイプの優先順位を決める重みで、0〜1の数値で表します。数値が大きいほうが優先されます。

```
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8
```

この場合、`text/html`、` application/xhtml+xml`、`image/webp`はデフォルトの1で最優先、`application/xml`が0.9、それ以外が0.8という優先度です。

### Referer

現在リクエストしているページへリンクしていた、前のウェブページのアドレスです。どこのウェブサイトからリンクされてきたかを表しています。

```
Referer: <url>
```

- `<url>` … 直前のページのURIです。

Refererヘッダには、プライバシーとセキュリティのリスクがあります。Refererへの情報の渡し方によっては、ユーザーの機密情報が漏洩してしまう可能性があります。たとえば、データの送信に`POST`ではなく`GET`を使用し、クエリパラメータにユーザーのパスワードなどを載せた場合、ユーザーのパスワードはクエリパラメータとしてwebサーバーのアクセスログ・ファイアウォールのログ・プロキシサーバーのキャッシュやログ・ブラウザのキャッシュや履歴など、さまざまな場所に記録されてしまいます。

上記のようなリスクを軽減するために、下記のような対策を取ることができます。

- 漏洩してはまずい情報の送信にはPOSTを使用する
- 通信プロトコルはHTTPではなくHTTPSを使用し、通信を暗号化する
- `Referrer-Policy`ヘッダを使用し、`Referer`ヘッダによって送られる情報を制御する（`Referrer-Policy: no-referrer`を設定した場合、`Referer`ヘッダ全体が省略される）
- `img`や`a`などのHTML要素の`rel`属性に`no-referrer`を設定して、`Referer`ヘッダによって送られる情報を制御する
- `img`や`a`などのHTML要素の`referrerpolicy`属性を使用し、`Referer`ヘッダによって送られる情報を制御する（2020年12月29日時点でMDN Web Docsでは「実験的な機能」とされている）

### Accept-Encoding

### Authorization

### Location

## ユースケース

### rel=noreferrerについて

### あと3つ

