# Expressに入門した

## webサーバの仕様

- `/`にGETリクエストを受けたとき、json`{"text": "hello world"}`をHTTPステータス200で返す
- `/`にPOSTリクエストを受けたとき、リクエストbodyに含まれるjsonをレスポンスbodyに含めてHTTPステータス201で返す
- POSTリクエストを受けるエンドポイントは、リクエストのContent-Typeがapplication/json以外のときはHTTPステータス400でエラーを返す

## 実装

https://github.com/gn-t-k/learn-express

環境作りはReact/TypeScriptで慣れてた？のですぐできた。

まずは、src/index.tsをエントリーポイントに

```typescript
import express from "express";
import router from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 8080;

app.listen(port);
```

### app.use()

`app.use`にミドルウェアと呼ばれる関数を渡すことで、クライアントからリクエストを受け取る→ミドルウェアを実行→クライアントにレスポンスを返すという処理をするらしい。index.tsでは、expressに最初から入っている`json()`と`urlencoded()`、自分で定義した`router`をミドルウェアとしてuseに渡している。

#### express.json()

POSTリクエストで受け取ったデータをjsonの形式で認識するためのメソッド。

HTTPのPOSTリクエストはいろんな形式のデータをストリームで送信するので、なにも変換しなかった場合、そのままでは使えない。クライアント側の作法としては、`Content-Type`ヘッダにどんなデータを送信するかを記載して、`Content-Length`にボディの長さを記載すれば、ボディに指定したバイト数であれば、テキストでも画像でもなんでも突っ込んでよいらしい（「らしい」ばっかりだな…）。`express.json()`ミドルウェアを読み込んでおけば、受け取ったデータをjsonの形式で認識できるので、リクエストのボディをkey-valueで扱えるようになる。

以前は`body-parser`というミドルウェアを読み込まないといけなかったみたいだが、いまはexpressの中に同様の働きをする`express.json()`があるのでこちらを使えばいいみたい。

#### express.urlencoded()

`express.json()`と同じような役割のミドルウェア。`Content-Type: application/x-www-form-urlencoded`のデータをurlencodedな形式（`key1=value1&key2=value2...`の文字列もしくは配列）で認識して扱えるようになる。

#### router

自分で定義したミドルウェア。

```typescript
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ text: "hello world" });
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    if (req.header("Content-Type") === "application/json") {
      res.status(201).json(req.body);
    } else {
      /**
       * TODO: `catch (error)`して、`error.message`でエラー返したいが、`error`の型がanyになってしまいeslintに怒られるのでエラーハンドリングの仕方知りたい
       */
      throw new Error("Content-Type: application/json is only allowed");
    }
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

export default router;
```

`express.Router()`を使って、どんなリクエストが来たらどんなレスポンスを返すか？を設定している。

POSTで`Content-Type`が`application/json`じゃなかったときだけそういうエラーメッセージを返したいので

```typescript
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message ?? "Sorry, something went wrong." });
  }
```

などとしたいが、errorの型がわからないのでeslint先生に怒られてしまう。（怒られるが、postmanで動作確認したところちゃんと動くのでやりかたは間違ってないはず）

### app.listen()

ポートを指定して、接続をバインドしてリッスンするらしい（？）。ここでは`.env`で指定した値→なければ8080を指定している。

## テスト

結構単純な仕様だったのでユニットテスト書きたかったが、どこをどうmockすべきかとかがよくわからなかった。要調査。