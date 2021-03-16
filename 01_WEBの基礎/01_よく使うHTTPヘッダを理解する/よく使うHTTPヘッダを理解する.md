# 【調査】よく使うHTTPヘッダを理解する

## HTTPヘッダの重要性

HTTPヘッダは、HTTPのメッセージボディに対する付加的な情報（いわゆるメタデータ）を表現するものです。クライアントやサーバーはHTTPのメッセージを受け取ったら、まずヘッダを見てボディに対する挙動を決定します。

リソースへのアクセス権を設定する認証、クライアントとサーバーの通信回数と量を節約するためのキャッシュなどはヘッダの情報があって実現する機能です。ヘッダの種類や扱い方を理解しておくことは、WEBサービスを扱う上で避けては通れません。

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

Refererヘッダについては、詳細をユースケースとして後述します。

### Accept-Encoding

コンテントネゴシエーションを使用して、クライアントが処理できるコンテンツのエンコーディング（圧縮アルゴリズムなど）をサーバーに通知するヘッダです。サーバーは、提案されたものから一つを選択して使用し、`Content-Encoding`ヘッダを使用してクライアントに選択結果を知らせます。

```
Accept-Encoding: <encoding>,<encoding>, … ,<encoding>;q=<qvalue>, …
```

- `<encoding>` … `gzip`, `compress`, `deflate`などの圧縮形式を指定したり、`identity`を設定してエンコードしないことを指定することもできます。また、`qvalue`で優先順位を決めることもできます。

### Authorization

ユーザーエージェントがサーバーから認証を受けるための証明証を保持するヘッダです。ユーザーエージェントからのリクエストが送られたあとにサーバーから`401 Unauthorized`が返ってきた場合（アクセスしたページの表示に認証が必要だった場合）、ユーザーエージェントの次のリクエストで使用される（認証に必要な情報を送信する）ことが多いヘッダです。

```
Authorization: <type> <credentials>
```

- `<type>` … 認証の種類で、`Basic`や`Digest`、`Bearer`などが設定される。
- `<credentials>` … 認証情報が設定される。例えば`<type>`に`Basic`が設定された場合、コロンで結合したユーザー名とパスワードをBase64でエンコードした文字列が設定される。

`Authorization`ヘッダについては、詳細をユースケースとして後述します。

### Location

サーバーがリクエストを受信したとき、ユーザーエージェントが要求したURLとは別のURLにリダイレクトさせたい場合にレスポンスに設定するヘッダです。

```
Location: <url>
```

- `<url>` … リダイレクトさせたい先のURL。

## ユースケース

### Refererヘッダのリスクについて

`Referer`ヘッダによって送られる情報は、HTML要素に特定の属性を設定したり別のヘッダを設定することで制御することができます。

#### なぜRefererによって送られる情報の制御が必要なのか？

Refererヘッダには、プライバシーとセキュリティのリスクがあります。Refererへの情報の渡し方によっては、ユーザーの機密情報が漏洩してしまう可能性があります。たとえば、データの送信に`POST`ではなく`GET`を使用し、クエリパラメータにユーザーのパスワードなどを載せた場合、ユーザーのパスワードはクエリパラメータとしてwebサーバーのアクセスログ・ファイアウォールのログ・プロキシサーバーのキャッシュやログ・ブラウザのキャッシュや履歴など、さまざまな場所に記録されてしまいます。

上記のようなリスクを軽減するために、下記のような対策を取ることができます。

- 漏洩してはまずい情報の送信にはPOSTを使用する
- 通信プロトコルはHTTPではなくHTTPSを使用し、通信を暗号化する
- `Referrer-Policy`ヘッダを使用し、`Referer`ヘッダによって送られる情報を制御する（後述）
- `img`や`a`などのHTML要素の`rel`属性に`no-referrer`を設定して、`Referer`ヘッダによって送られる情報を制御する
- `img`や`a`などのHTML要素の`referrerpolicy`属性を使用し、`Referer`ヘッダによって送られる情報を制御する（2020年12月29日時点でMDN Web Docsでは「実験的な機能」とされている）

#### `Referrer-Policy`ヘッダによるリファラー情報の制御

`Referrer-Policy`ヘッダを使えば、`Referer`によって送られるリファラー情報を制御することができます。

```
Referrer-Policy: <policy>
```

- `<policy>` … どのような制御を行うかを設定できる。下記のpolicyが利用できる。
  - `no-referrer` … すべてのリファラー情報が省略される。
  - `no-referrer-when-downgrade` … `Referrer-Policy`が設定されていない場合はこのpolicyが既定値として設定される。HTTPからHTTPへの送信やHTTPSからHTTPSへの送信などプロトコルのセキュリティ水準が同一である場合、もしくはHTTPからHTTPSへの送信など改善される場合は、URLのオリジン・パス・クエリ文字がリファラーとして送信される。HTTPSからHTTPへの送信などプロトコルのセキュリティ水準が低下する場合は、すべてのリファラーが省略される。
  - `origin` … 文書のオリジンのみが送信される。オリジンとは、URLのスキーム・ホスト・ポートによって定義される（パスはオリジンに含まれない）。
  - `origin-when-cross-origin` … 同一オリジン間でリクエストを行う場合、オリジン・パス・クエリパラメータを送信する。同一オリジンでない場合はオリジンのみ送信する。
  - `same-origin` … 同一オリジン間でリクエストを行う場合、リファラーを送信する。同一オリジンでない場合はすべてのリファラー情報が省略される。
  - `strict-origin` … HTTPからHTTPへの送信やHTTPSからHTTPSへの送信などプロトコルのセキュリティ水準が同一である場合、もしくはHTTPからHTTPSへの送信など改善される場合、文書のオリジンを送信する。HTTPSからHTTPへの送信などプロトコルのセキュリティ水準が低下する場合は、すべてのリファラーが省略される。
  - `strict-origin-when-cross-origin` … 同一オリジン間でリクエストを行う場合、オリジン・パス・クエリパラメータを送信する。同一オリジンでない場合は、すべてのリファラーが省略される。
  - `unsafe-url` …すべてのリファラー情報が送信される。

### 同一オリジンポリシーについて

前述の`Referrer-Policy`ヘッダによるリファラー情報の制御では、「同一オリジン間でリクエストを行う場合」や「同一オリジンでない場合」など、同一オリジンかどうかという条件がいくつかでてきました。あるオリジンから読み込まれた文書やスクリプトについて、そのリソースから他のオリジンのリソースにアクセスできないように制限する仕組みのことを同一オリジンポリシーと呼びます。

#### オリジンの定義

オリジンは、URLのスキーム（`http://`, `https://`）、ホスト（`example.com`）、ポート（`:80`, `:443`）によって定義されます。ある2つのウェブコンテンツにおいて、スキーム、ホスト、ポートがすべて一致した場合、その2つのウェブコンテンツは同一オリジンであるといえます。

### `Authorization`ヘッダによる認証について

リソースへのアクセスに制限がかかっている場合、`Authorization`ヘッダに認証情報を付与する必要があります。`Authorization`ヘッダで設定できる認証方法を3つ紹介します。

#### `Basic`認証

"`<username>:<password>`"をbase64でエンコードした文字列が認証情報として扱います。認証情報がデコード可能なので、データの盗聴などを防ぐためにはHTTPSプロトコルを利用して通信を暗号化するなどの対応が必要です。

#### `Digest`認証

サーバーから送られてきたランダムな文字列（nonce）とパスワードを組み合わせてハッシュ値を生成し、それを認証情報として扱う認証方式です。認証情報は暗号化されていますが、メッセージのボディは暗号化されないため、メッセージのボディの盗聴を防ぐためにはHTTPSプロトコルを利用して通信を暗号化するなどの対応が必要です。

#### `Bearer`認証

事前に入手したトークン（Bearer token）を`Authorization`ヘッダに設定してリクエストを送り、サーバがそれを確認することで認証を行う認証方式です。クライアントが事前に入手するトークンは、認可サーバーに要求して発行してもらう方式（OAuth）で取得します。

### `Cache-Control`ヘッダによるキャッシュの制御について

キャッシュとは、取得した情報を再利用するための仕組みです。キャッシュをうまく利用すれば、クライアントとサーバーの通信回数と量を節約することができます。`Cache-Control`ヘッダを利用すれば、情報の検証（情報を再取得すべきかどうかを判断する）と再取得（キャッシュを利用せず改めて情報を取得する）の条件を設定できます。

#### `no-store`

`Cache-Control: no-store`を指定すると、レスポンスをキャッシュに保存できなくなります。

#### `max-age`

`Cache-Control: max-age=<seconds>`を指定すると、キャッシュが保存されてから`<seconds>`秒が経過するまではリソースは古くないとみなされ、更新されなくなります。つまり、キャッシュの有効期限が設定できます。設定した時刻が経過して以降にレスポンスを受け取ると、キャッシュは更新されます。

#### `no-cache`

`Cache-Control: no-cache`を指定すると、格納されたレスポンスは、使用する前にかならず検証されます（有効期限が切れていなくても検証されます）。

#### `must-revalidate`

`Cache-Control: must-revalidate`を指定すると、格納されたレスポンスは、有効期限が切れている場合、使用する前にかならず検証されます。

## 参考文献

- https://developer.mozilla.org/ja/docs/Web/HTTP/Headers
- https://developer.mozilla.org/ja/docs/Web/Security/Referer_header:_privacy_and_security_concerns
- https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy
- https://developer.mozilla.org/ja/docs/Web/HTTP/Authentication#Authentication_schemes
- https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cache-Control
- https://architecting.hateblo.jp/entry/2020/03/27/130535
- https://www.ryotosaito.com/blog/?p=264
- 書籍 Webを支える技術 山本陽平 技術評論社