// TODO: 後で消す
export interface IExercise {
  title: string;
  status: "未着手" | "レビュー待ち" | "完了";
}
export class Member {
  private id_: string;
  private name_: string;
  private email_: string;
  private status_: string;
  private exerciseList_: IExercise[];

  constructor(
    id: string,
    name: string,
    email: string,
    exerciseList: IExercise[],
  ) {
    this.id_ = id;
    this.name_ = name;
    this.email_ = email;
    // TODO: 在籍ステータスオブジェクトを受け取る
    this.status_ = "在籍中";
    // TODO: 課題オブジェクトを受け取る
    this.exerciseList_ = exerciseList;
  }

  public get name(): string {
    return this.name_;
  }

  public get email(): string {
    return this.email_;
  }

  public get status(): string {
    return this.status_;
  }

  public get exerciseList(): IExercise[] {
    return this.exerciseList_;
  }

  public changeName(name: string): Member {
    this.name_ = name;

    return this;
  }

  public changeEmail(email: string): Member {
    this.email_ = email;

    return this;
  }

  // TODO: 所属しているペアを取得する
  // TODO: 在籍ステータスを変更する
  // TODO: 割り当てられた課題のステータスを変更する
}
