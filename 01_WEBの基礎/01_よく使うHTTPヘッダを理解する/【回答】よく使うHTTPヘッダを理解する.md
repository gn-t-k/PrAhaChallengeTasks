# 【回答】よく使うHTTPヘッダを理解する

## 課題1

### 各種ヘッダーの意味と役割

#### Host

HTTPリクエストが送信される先のサーバーのホスト名とポート番号を指定する。

#### Content-type

そのメッセージのボディの内容がどのような種類なのかを、MIME（Multipurpose Internet Mail Extensions）という電子メールの仕様から拝借してきた仕様を使って表現する。

#### User-agent

リクエストを行うユーザーエージェントソフトウェア（ウェブブラウザなどのこと）のOS、ベンダー、バージョンを識別する。

#### Accept

クライアントが処理できるデータの種類をサーバーに通知する。

#### Referer

どこのウェブサイトからリンクされてきたかを表す。

#### Accept-Encoding

クライアントが処理できるコンテンツのエンコーディング（圧縮アルゴリズムなど）をサーバーに通知する。

#### Authorization

ユーザーエージェントがサーバーから認証を受けるための証明証を保持する。

#### Location

サーバーがリクエストを受信したとき、ユーザーエージェントが要求したURLとは別のURLにリダイレクトさせたい場合にレスポンスに設定する。

### refererについて

#### なぜrel=noreferrerの設定が必要か

Refererへの情報の渡し方によっては、ユーザーの機密情報が漏洩してしまうリスクがあるため。

#### rel=noreferrerを設定しなかった場合に起きうる問題

たとえば、データの送信に`POST`ではなく`GET`を使用し、クエリパラメータにユーザーのパスワードなどを載せた場合、ユーザーのパスワードをクエリパラメータとして持つURLが、webサーバーのアクセスログ・ファイアウォールのログ・プロキシサーバーのキャッシュやログ・ブラウザのキャッシュや履歴など、さまざまな場所に記録されてしまう。

#### 先輩エンジニアの依頼を実現するために必要なHTTPレスポンスヘッダの設定

`Referrer-Policy: origin-when-cross-origin`を設定する。

## 課題2

### クイズ1

`Referrer-Policy`ヘッダによるリファラー情報の制御では、「同一オリジン間でリクエストを行う場合」や「同一オリジンでない場合」など、同一オリジンかどうかという条件による制御を行うことがある。下記の4つのURLの組み合わせのうち、同一オリジンとみなされる組み合わせはどれか。

- A.
  - `http://example.com/app1`
  - `https://example.com/app2`
- B.
  - `http://Example.com:80`
  - `http://example.com`
- C.
  - `http://example.com`
  - `http://www.example.com`
- D.
  - `http://example.com`
  - `http://example.com:8080`

<details>
 <summary>解答</summary>
  B<br />
  URLを比較し、スキームが同一、ホストが同一（大文字小文字を区別しない）、ポートが同一（Webサーバはデフォルトで80ポートでコンテンツを配信する）であるBを選択するのが正解
</details>

### クイズ2

下記のように`Authorization`ヘッダが設定されている場合、入力されたユーザー名とパスワードの文字列はそれぞれ何になるか。

```
Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
```

<details>
  <summary>解答</summary>
  ユーザー名：aladdin<br />
  パスワード：opensesame<br />
  Basic認証の認証情報は、ユーザー名とパスワードをコロンでつないでBase64でエンコードしているだけなので、Base64でデコードすれば取得することができる。平文で送るのと同じ。
</details>

### クイズ3

`Cache-Control`ヘッダによるキャッシュの制御について、`Cache-Control: no-cache`を設定した場合と`Cache-Control: must-revalidate`を設定した場合、どちらも「コンテンツをリクエストする際、キャッシュに記録されているコンテンツが現在も有効であるか否かをWebサーバに問い合わせる」という設定になる。これらの設定の違いはなにか。

<details>
  <summary>解答</summary>
  有効期限によって動作が変わるかどうかが異なる。<br />
  <code>no-cache</code>の場合、キャッシュが有効期限内でも、必ずサーバーに問い合わせをする<br />
  <code>must-revalidate</code>の場合、キャッシュが有効期限内ならキャッシュを利用し、有効期限が切れていたらサーバーに問い合わせをする
</details>
