# データベースにおけるNULLの扱い

## 課題1

| クエリ | 結果 |
| - | - |
| `SELECT * FROM employees WHERE NULL = 0 LIMIT 100` | 0件取得 |
| `SELECT * FROM employees WHERE NULL = NULL LIMIT 100` | 0件取得 |
| `SELECT * FROM employees WHERE NULL <> NULL LIMIT 100` | 0件取得 |
| `SELECT * FROM employees WHERE NULL AND TRUE LIMIT 100` | 0件取得 |
| `SELECT * FROM employees WHERE NULL AND FALSE LIMIT 100` | 0件取得 |
| `SELECT * FROM employees WHERE NULL OR TRUE LIMIT 100` | 全件取得 |

## 課題2

```plaintext
TABLE issue {
  id: varchar NOT NULL
  text: varchar NOT NULL
}

TABLE assignee {
  id: varchar NOT NULL
  issue_id: varchar NOT NULL
}
```

以上のように`assignee`に`issue_id`（issueのidと紐付く）を追加すれば、新しくテーブルを作る必要は無いのでは。気になるのが、`user`などのユーザーのテーブルがあった場合、`assignee`と紐つける必要があるかも、ということ。

```plaintext
TABLE issue {
  id: varchar NOT NULL
  text: varchar NOT NULL
}

TABLE assignee {
  id: varchar NOT NULL
  issue_id: varchar NOT NULL
  user_id: varchar NOT NULL
}

TABLE user {
  id: varchar NOT NULL
  〜〜様々なプロパティ〜〜
}
```

## 課題3

### クイズ1

パフォーマンスチューニングの観点で、NULLを使う際に注意すべき点はなにか。

<details>
  <summary>回答例</summary>

  `IS NULL`や`IS NOT NULL`を指定する場合、インデックスが参照されない点。
</details>

### クイズ2

データベースにおいて`NULL / 0`の計算結果はどのようになるか。

<details>
  <summary>回答</summary>

  NULLになる。

  エラーにすらならないのはどうなのと思った。
</details>

### クイズ3

どうしても「未設定」のような値が入るカラムを用意したい場合、NULLを使わずに解決するにはどうすればよいか。

<details>
  <summary>回答例</summary>

  デフォルト値を用意する。
</details>
