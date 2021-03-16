# XMLHttpRequestについて理解する

## XMLHttpRequestとは

JavaScriptによってブラウザとWebサーバー間でデータの送受信を行うためのオブジェクト。例えばGETリクエストを送信する場合、下記のように使用する。

```javascript
const xhr = new XMLHttpRequest(),
  method = "GET",
  url = "https://developer.mozilla.org/";

xhr.open(method, url, true);
xhr.onreadystatechange = () => {
  // リクエストの状態が変化したときの処理
  if (xhr.readyState === XMLHttpRequest.DONE) {
    // リクエストが完了したときの処理
    const status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // 正常に終了したときの処理
      console.log(xhr.responseText);
    } else {
      // 正常に終了しなかったときの処理
    }
  }
};
xhr.send();
```

### 通常のHTTPリクエストとの違い

XMLHttpRequestは通常のHTTPリクエストと違い、WEBサーバーからデータを受信し終わったあとからでもデータの送受信を行うことができる。そのため、ページをリロードすること無くページの内容を書き換えることができる。

## Cookieの付与

異なるオリジン間でXMLHttpRequestによってCookieなどの資格情報を含むリクエストは、デフォルトでは送信されない。資格情報を含むリクエストを送信するためには、下記のように`withCredentials`をtrueに設定する必要がある。

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```

## CORSについて

CORSとはCross Origin Resource Sharingの略。

通常、ブラウザは同一オリジンポリシーによって、オリジンAの文書やスクリプトなどのリソースからオリジンBのリソースにはアクセスできないように制限されている。CORSは、追加のHTTPヘッダを使用することで、同一オリジンポリシーによるリソース間のアクセスの制限を緩和するためのブラウザの仕組み。XMLHttpRequestを使用してクロスドメインのリソースにリクエストを送信する場合は、CORSの仕様に則ってリクエストを送信する必要がある。詳細は[ドキュメント](https://gntk.dev/post/20210121-learn-cors)にまとめてあるためそちらを参照。

表示されているエラーは、HTTPヘッダ`Access-Control-Allow-Origin`をサーバー側で設定していないため返却されているエラーメッセージ。サーバー側でCORSの設定をしておく必要がある。
