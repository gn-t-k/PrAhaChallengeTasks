const createdAt = new Date();
const updatedAt = new Date();

export const mockMemberDataList = [
  {
    id: "10c54873-6408-4b7d-8328-3e245cac981f",
    name: "Dallas Balistreri",
    email: "Hassan_Schumm@gmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
    exercise: [
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "6d9b1356-cac3-4418-ac11-be94ef321ded",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "f1990102-eca8-4f92-98e3-333ecd736c28",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "70827935-f365-46b9-a0bd-4100053eb5e4",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "0e976c50-2f12-4f73-8f69-88f78f999ae8",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "0c38b747-891d-4ecf-8d95-55b29a9c75b8",
        progressStatus: "レビュー待ち",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "7fd60144-e721-47ab-8942-8cdb59d26d1c",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "62068e37-27f7-49f6-8a27-8d62edc8b853",
        progressStatus: "レビュー待ち",
        createdAt,
        updatedAt,
      },
      {
        memberId: "10c54873-6408-4b7d-8328-3e245cac981f",
        exerciseId: "619b63ad-6d3a-4f60-8e9c-9c3bd5a6eff9",
        progressStatus: "未着手",
        createdAt,
        updatedAt,
      },
    ],
  },
];

export const mockExerciseDataList = [
  {
    id: "0c38b747-891d-4ecf-8d95-55b29a9c75b8",
    title: "SQL10本ノック",
    description:
      "普段ORマッパーを使っている人ほど直接 SQL を書いた経験は少ないもの…",
    exerciseGroupId: "28388eb5-aa06-41f8-a7d0-f343c04b5e91",
    createdAt,
    updatedAt,
  },
  {
    id: "7fd60144-e721-47ab-8942-8cdb59d26d1c",
    title: "curlとpostmanに慣れる",
    description:
      "何かAPIに不具合が起きた時、動作確認をしたい時、毎回フロントエンドを…",
    exerciseGroupId: "de4597c4-f07d-45ea-b59c-73a239335135",
    createdAt,
    updatedAt,
  },
  {
    id: "70827935-f365-46b9-a0bd-4100053eb5e4",
    title: "設計原則（SOLID）",
    description:
      "設計を考えられていないソフトウェアは技術的な負債が毎日蓄積して、開発…",
    exerciseGroupId: "247ec7a7-c7b2-4090-9027-802ccca0dea6",
    createdAt,
    updatedAt,
  },
  {
    id: "6d9b1356-cac3-4418-ac11-be94ef321ded",
    title: "よく使うHTTPヘッダを理解する",
    description:
      "HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を…",
    exerciseGroupId: "de4597c4-f07d-45ea-b59c-73a239335135",
    createdAt,
    updatedAt,
  },
  {
    id: "f1990102-eca8-4f92-98e3-333ecd736c28",
    title: "jestで単体テストを書こう",
    description:
      "品質の高いコードを書く上で、単体テストほど重要な存在はありません…",
    exerciseGroupId: "97c4beda-549c-4f23-bcf8-c303a7b8e4d4",
    createdAt,
    updatedAt,
  },
  {
    id: "62068e37-27f7-49f6-8a27-8d62edc8b853",
    title: "オニオンアーキテクチャを学ぶ",
    description:
      "プログラミングは非常に自由度の高い活動です。そのため自分と他のプログ…",
    exerciseGroupId: "247ec7a7-c7b2-4090-9027-802ccca0dea6",
    createdAt,
    updatedAt,
  },
  {
    id: "0e976c50-2f12-4f73-8f69-88f78f999ae8",
    title: "インデックスを理解する",
    description:
      "ディスクへの書き込みや呼び出しはメモリ上に展開されたアプリケーション…",
    exerciseGroupId: "28388eb5-aa06-41f8-a7d0-f343c04b5e91",
    createdAt,
    updatedAt,
  },
  {
    id: "619b63ad-6d3a-4f60-8e9c-9c3bd5a6eff9",
    title: "storybookを作ろう",
    description:
      "「Storybook」はフロントエンドの開発でよく用いられるツールで、簡単…",
    exerciseGroupId: "97c4beda-549c-4f23-bcf8-c303a7b8e4d4",
    createdAt,
    updatedAt,
  },
];
