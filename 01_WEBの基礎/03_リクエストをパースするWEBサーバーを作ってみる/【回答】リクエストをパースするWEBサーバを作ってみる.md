# 【回答】リクエストをパースするWEBサーバを作ってみる

## 課題1

実装済。`src/index.ts`を参照。



## 課題2

### `Content-type: application/x-www-form-urlencoded`

`key1=value1&key2=value2&...`の形式でキーとバリューの組を送信できる。英数字と3種類の記号`_`, `.`, `-`はそのまま、スペースは`+`に変換され、それ以外の文字は`%xx`の16進数の形式になる。

### `Content-type: application/json`

jsonの形式でデータを送信できる。オブジェクトをネストしたり、文字列、数値、ブーリアン、配列などを表現できる。

### どのように使い分けるべきか

シンプルなキー・バリューであれば`Content-type: application/x-www-form-urlencoded`、オブジェクトのネストや文字列、数値、ブーリアン、配列、などを扱いたい場合は`Content-type: application/json`を使う？