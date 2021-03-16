# E2Eテストを書こう

## 課題1

実装済み。下記の操作で動作確認可能。

```shell
// マルバツゲームの用意
cd app
yarn install --frozen-lockfile
yarn start

// E2Eテストの用意・実行（別のターミナルで実行）
cd e2e
yarn install --frozen-lockfile
yarn cypress:run
```

app配下は、前回の課題で作成したマルバツゲームのコードに、カスタムデータ属性`data-testid`を追加しただけ。
スナップショットについては、課題「スナップショットテストを書こう」で実施したため省略。
E2Eのテストコードは、`e2e/cypress/integration/`配下に格納。

## 課題2

### E2Eテストのメリット

- インフラ/バックエンド/フロントエンドなどのアーキテクチャが問題なく接続できていることを確認できる
- アプリケーションの動作をユースケースに沿ってテストできるので、最低限の機能が動作していることを確認できる

### E2Eテストのデメリット

- 最低限の機能のテストしかできないため、細かい不具合は検知できない場合がある
- 実行に時間がかかる
- アプリケーション全体をテストするため、変更によって陳腐化しやすい→保守コストがかかる

### テスト手法の選択の基準

- 単体/統合/E2Eテストは、組み合わせて用意するべきである
- ボリュームは単体>統合>E2Eの順にするべきである
  - 単体テストは（他と比べて）壊れにくく・ロジックを確実に確かめられるテストであるため、単体テストを最も優先して用意するべきである
  - 統合テストは、フロントエンドとバックエンドの接続など、単体テストでは確認できない隙間をカバーする目的で用意するべきテストである
  - E2Eは、アプリケーションの最低限の動作を保証するために用意するべきテストである

## 課題3

### クイズ1

今回の課題では、アプリケーションのパッケージ管理とE2Eテストのパッケージ管理を別々にしたが、それによるメリットとして考えられるものは何か。

<details>
  <summary>回答</summary>

  アプリケーションで利用するパッケージの依存関係とE2Eテストで利用するパッケージの依存関係との競合を防ぐことができる。

</details>

### クイズ2

CypressによるE2Eテストで、テストケースにおいて待機時間が長いHTTPリクエストが多いせいで（ロジックが間違っていないにもかかわらず）タイムアウトになってテストが失敗している場合、どのような対策をすべきか。

<details>
  <summary>回答</summary>

  （例）HTTPリクエストの完了を待機するよう記述する

  ```javascript
  cy.server()
    .route('POST', 'https://example.com/api/application/load')
    .as('load') // create an alias

  // Start test
  cy.visit('/')

  // wait for the call
  cy.wait('@load')

  // Now the data is loaded
  ```

  [参考](https://typescript-jp.gitbook.io/deep-dive/intro-1/cypress#hinto-httprikuesutowotsu)

</details>

### クイズ3

CypresによるE2Eテストで、HTTPリクエストのレスポンスをモックするメソッドは何か。

<details>
  <summary>回答</summary>

  （例）`route`を使用する

  ```javascript
  cy.server()
    .route('POST', 'https://example.com/api/application/load', /* Example payload response */{success:true});
  ```

  [参考](https://typescript-jp.gitbook.io/deep-dive/intro-1/cypress#hinto-httprikuesutonoresuponsuwomokkusuru)

</details>
