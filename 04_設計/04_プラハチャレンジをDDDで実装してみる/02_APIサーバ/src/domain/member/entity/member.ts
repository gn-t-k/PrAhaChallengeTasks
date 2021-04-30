import { ActivityStatus } from "domain/member/value-object/activity-status";

// TODO: 後で消す
export interface IExercise {
  title: string;
  status: "未着手" | "レビュー待ち" | "完了";
}

export interface IMember {
  id: string;
  name: string;
  email: string;
  activityStatus: ActivityStatus;
  exerciseList: IExercise[];
}

export class Member {
  private props: IMember;

  constructor(
    id: string,
    name: string,
    email: string,
    activityStatus: ActivityStatus,
    exerciseList: IExercise[],
  ) {
    if (name === "") {
      throw new Error("Illegal name value.");
    }
    if (email === "") {
      throw new Error("Illegal email value.");
    }

    this.props = {
      id,
      name,
      email,
      activityStatus, // TODO: 課題オブジェクトを受け取る
      exerciseList,
    };
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get status(): ActivityStatus {
    return this.props.activityStatus;
  }

  public get exerciseList(): IExercise[] {
    return this.props.exerciseList;
  }

  public changeName(name: string): Member {
    this.props.name = name;

    return this;
  }

  public changeEmail(email: string): Member {
    this.props.email = email;

    return this;
  }

  public changeActivityStatus(activityStatus: ActivityStatus): Member {
    this.props.activityStatus = activityStatus;

    return this;
  }

  // TODO: 所属しているペアを取得する
  // TODO: 割り当てられた課題のステータスを変更する
}
