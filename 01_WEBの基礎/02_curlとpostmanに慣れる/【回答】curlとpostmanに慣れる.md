# 【回答】curlとpostmanに慣れる
## curl
### 問題1
ヘッダーは`-H`オプションで設定する
```
curl -H "X-Test: hello"  "https://httpbin.org/headers"
```
### 問題2
`-d`オプションで設定するデータの中でダブルクォーテーションを使う場合、バックスラッシュを使ってエスケープする
```
curl -H "Content-Type: application/json" -d "{\"name\": \"hoge\"}" "https://httpbin.org/post" 
```
### 問題3
```
curl -H "Content-Type: application/json" -d "{\"userA\": {\"name\": \"hoge\", \"age\": 29}}" "https://httpbin.org/post" 
```
### 問題4
```
 curl -H "Content-Type: application/x-www-form-urlencoded" -d "{\"name\": \"hoge\"}" "https://httpbin.org/post"
```
### クイズ1
このパズルをクリアしてみてください
http://challenge-your-limits.herokuapp.com/

### クイズ2
macOSアプリケーションのパッケージマネージャHomebrewをインストールする下記のスクリプトにおける`curl`コマンドの使い方について、正しい説明をA〜Cの3つの選択肢の中から選んでください。
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- A. リクエスト失敗時のエラーhtml・ダウンロードの進捗・エラーメッセージを表示せず、リダイレクトが設定されていた場合リダイレクト先へリクエストは発行しない。
- B. リクエスト失敗時のエラーhtml・ダウンロードの進捗は表示しないが、エラーメッセージは表示する。リダイレクトが設定されていた場合、リダイレクト先へリクエストを発行する。
- C. ダウンロードの進捗は表示しないが、リクエスト失敗時のエラーhtml・エラーメッセージは表示する。リダイレクトが設定されていた場合、リダイレクト先へリクエストを発行する。

<details>
  <summary>解答</summary>
  B<br />
  <code>-S</code>オプションは<code>-s</code>オプションと併用することが前提のオプションで、進捗は表示されませんがエラーは表示されるようになります。
</details>

### クイズ3
`-d`オプションでkey=valueを複数設定する方法を2つ示してください。

<details>
  <summary>解答</summary>
  1. <code>-d</code>オプションを複数設定する<br />
  <code>
  $ curl -d "key1=value1" -d "key2=value2" http://example.com
  </code>
  <br />
  2. <code>&</code>でkey=valueをつなげる<br />
   <code>
  $ curl -d "key1=value1&key2=value2" http://example.com
  </code>
</details>

## postman
### 問題1
<img width="948" alt="スクリーンショット 2021-01-02 14 47 16" src="https://user-images.githubusercontent.com/54714779/103451611-7ea94900-4d09-11eb-8a52-74febe01dc92.png">

### 問題2
Bodyは、ラジオボタン`row`を選択→プルダウン`JSON`を選択して設定する
<img width="1105" alt="スクリーンショット 2021-01-02 14 49 23" src="https://user-images.githubusercontent.com/54714779/103451645-fa0afa80-4d09-11eb-8668-8cc84a1569b2.png">

### 問題3
<img width="1109" alt="スクリーンショット 2021-01-02 14 53 14" src="https://user-images.githubusercontent.com/54714779/103451685-46eed100-4d0a-11eb-89d9-be692388f474.png">

### 問題4
Bodyは、ラジオボタン`x-www-form-unlencoded`を選択して設定する
<img width="1110" alt="スクリーンショット 2021-01-02 14 54 41" src="https://user-images.githubusercontent.com/54714779/103451699-7998c980-4d0a-11eb-8db1-42d8c34d59b4.png">

### クイズ1
Postmanの環境変数機能Environmentで下記のように環境変数を設定している場合、問題4のリクエストURLはどのように書けるか
![スクリーンショット 2021-01-02 17 27 24](https://user-images.githubusercontent.com/54714779/103453741-70b2f280-4d20-11eb-97e3-3eeb1ab78524.png)

<details>
  <summary>解答</summary>
  <code>{{url}}/post</code>
</details>

### クイズ2
postmanを使ってできることを全て選んでください
- A. APIの単体テストを作成する
- B. APIの統合テストを作成する
- C. postmanで作成したテストをCIに組み込む

<details>
  <summary>解答</summary>
  A, B, C<br />
  <ul>
    <li>A … <code>Tests</code>タブにJavaScriptのコードを記述すれば、リクエストの結果を検証できます。テストの結果は、<code>Tests Results</code>で確認できます</li>
    <li>B … <code>Tests</code>タブ内に、APIのレスポンスの結果をEnvironmentの環境変数内に保存する処理を記述すれば、レスポンスの内容を他のテストで使いまわし、統合テストのようにすることができます</li>
    <li>C … postmanで作成したテストを<code>Export</code>機能でjsonにエクスポートし、テストランナーnewmanに読み込ませれば、postmanで作成したテストをCIに組み込むことも可能です</li>
  </ul>
  参考：https://iridge-tech.hatenablog.com/entry/2019/12/06/120000
</details>

### クイズ3
リクエストボディにリクエストした時間（リクエストごとに毎回値が異なる）を含める方法を考えてください（ヒント：`Pre-request Script`機能と、`Environment`機能を使った方法で実現できます）

<details>
  <summary>解答</summary>
  <ol>
    <li>時間を扱う環境変数を用意する</li>
    <li><code>Pre-request Script</code>に、用意した環境変数に<code>Date.now()</code>の値を代入する処理を記述する</li>
    <li>リクエストボディに、用意した環境変数を設定する</li>
  </ol>
  参考：https://qiita.com/zaburo/items/16ac4189d0d1c35e26d1#pre-request-script
</details>