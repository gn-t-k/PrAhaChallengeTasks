import { ActivityStatusList } from "../value-object/actibity-status-list";

// TODO: 後で消す
export interface IExercise {
  title: string;
  status: "未着手" | "レビュー待ち" | "完了";
}
export class Member {
  private id_: string;
  private name_: string;
  private email_: string;
  private activityStatus_: string;
  private activityStatusList_: ActivityStatusList;
  private exerciseList_: IExercise[];

  constructor(
    id: string,
    name: string,
    email: string,
    activityStatusList: ActivityStatusList,
    exerciseList: IExercise[],
  ) {
    this.id_ = id;
    this.name_ = name;
    this.email_ = email;
    this.activityStatus_ = activityStatusList.currentStatus.value;
    this.activityStatusList_ = activityStatusList;
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
    return this.activityStatus_;
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

  public changeActivityStatus(activityStatus: string): Member {
    if (
      !this.activityStatusList_.all
        .map((status) => status.value)
        .includes(activityStatus)
    ) {
      throw new Error("Invalid status value.");
    }

    this.activityStatus_ = activityStatus;

    return this;
  }

  // TODO: 所属しているペアを取得する
  // TODO: 在籍ステータスを変更する
  // TODO: 割り当てられた課題のステータスを変更する
}
