# storybookを作ろう

## 課題1

実装済み。以下の操作で動作確認可能。

```shell
yarn install --frozen-lockfile
yarn start
// localhost:3000
```

## 課題2

実装済み。以下の操作で動作確認可能。

```shell
yarn install --frozen-lockfile
yarn storybook
// localhost:6006
```

## 課題3

StoryBookを使って開発することのメリット・デメリット。

### メリット

- デザイナーやプロダクトオーナーに実装の確認をしてもらいやすい
- ボトムアップに開発しやすくなる
- プロジェクトに後から参加したデザイナー・エンジニアが状況を把握しやすい

### デメリット

- 実装コード以外にもstoryのコードを書かなければいけないため、手間がかかる
- 実装の変更に伴って、storyを保守しなければいけなくなる
- 実装したコンポーネントの設計が適切でない場合、storyを作るのに時間がかかったり保守するのが大変だったりして、開発速度を低下させる可能性がある

## 課題4

### クイズ1

storybookでスタイルガイドを作成できるフロントエンドフレームワークはどれか。

a. React
b. Vue.js
c. Angular

<details>
  <summary>回答</summary>

**a, b, c**

</details>

### クイズ2

storybookの設定（storyを置くディレクトリを設定したり、使用するアドオンを設定したり）するためには、どのファイルを修正すればよいか。

<details>
  <summary>回答</summary>

  `.storybook/main.js`
</details>

### クイズ3

コンポーネントのpropsを、storybookの画面上で切り替えられるようにするにはどうすればよいか。

<details>
  <summary>回答</summary>

  （例）default exportのオブジェクト（componentとかtitleとかあるやつ）に`argTypes: { propsName: { control: 'xxx' } }`を追加する。
  <https://storybook.js.org/docs/react/essentials/controls>

</details>
