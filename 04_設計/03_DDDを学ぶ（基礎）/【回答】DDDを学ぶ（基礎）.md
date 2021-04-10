# DDDを学ぶ（基礎）

## 課題1

### エンティティ

DDDにおける「エンティティ」は、ソフトウェアで解決する課題領域で扱う対象の概念を、値と振る舞いを持つオブジェクトとしてコードに落とし込んだもの。

例えば「ユーザー」をエンティティとして`User`クラスで表現すると、`name`や`age`といった値や`changeName`といった振る舞いを持たせることができる。

`name`や`age`は可変な値であり、`changeName`によって`name`を変更したりできる。値を変更したことによって他のオブジェクトと区別がつかなくなるとオブジェクトを適切に扱えなくなる可能性があるので、エンティティには`id`などの一意な識別子を持たせるか、組み合わせによって必ず一意になるようなプロパティを持たせるなどする。

```typescript
class User {
  private id: string;
  private name: string;
  private age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  get name(): string {
    return this.name;
  }
  get age(): number {
    return this.age;
  }
  public changeName(name: string) {
    this.name = name;
  }
}
```

### 値オブジェクト

DDDにおける「値オブジェクト」は、ソフトウェアで解決する課題領域で扱う特定の数値や文字列を、計測・定量化・説明するためのオブジェクトとしてコードに落とし込んだもの。

値オブジェクトは値を不変のものとして扱うため、コンストラクタでプロパティを設定して以降はプロパティの値を更新しない。

例えば`User`クラスの`age`プロパティは、プリミティブな値`number`ではなく、値オブジェクトのクラス`Age`として扱うことができる。

```typescript
class Age {
  private age: number

  constructor(age: number) {
    if (age < 0) {
      // 値のバリデーションを設定できる。
      throw new Error('年齢は0歳以上が設定可能です')
    }
    this.age = age;
  }

  get value(): number {
    return this.age;
  }

  public isEqual(age: Age): boolean {
    // 他のAgeオブジェクトと値が等しいかどうかをチェックできる。
    return age.value === this.age;
  }
}

class User {
  private id: string;
  private name: string;
  private age: number;

  constructor(id: string, name: string, age: Age) {
    this.id = id;
    this.name = name;
    this.age = age.value;
  }

  get name(): string {
    return this.name;
  }
  get age(): number {
    return this.age;
  }
  public changeName(name: string): void {
    this.name = name;
  }
}
```

### 集約

DDDにおける「集約」は、オブジェクトのまとまりを表し、整合性を保ちながらデータを更新する単位である。

### ユビキタス言語

### 境界づけられたコンテキスト

### ドメイン

### ドメインサービス

### リポジトリ

### アプリケーション

### CQRS

### DTO

## 課題2

### クイズ1

### クイズ2

### クイズ3
