import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Exercise } from "domain/exercise/entity/exercise";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

export interface IMember {
  name: string;
  email: string;
  activityStatus: ActivityStatus;
  exerciseList: Exercise[];
}

export class Member extends AggregateRoot<IMember> {
  constructor(props: IMember, id?: Identifier) {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }
    if (props.email === "") {
      throw new Error("Illegal email value.");
    }

    super(props, id);
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

  public get exerciseList(): Exercise[] {
    return this.props.exerciseList;
  }

  public changeName(name: string): Member {
    if (name === "") {
      throw new Error("Illegal name value.");
    }

    this.props.name = name;

    return this;
  }

  public changeEmail(email: string): Member {
    if (email === "") {
      throw new Error("Illegal email value.");
    }

    this.props.email = email;

    return this;
  }

  public changeActivityStatus(activityStatus: ActivityStatus): Member {
    this.props.activityStatus = activityStatus;

    return this;
  }
}
