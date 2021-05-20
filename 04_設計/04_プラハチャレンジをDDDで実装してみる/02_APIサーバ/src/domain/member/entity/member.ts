import { ActivityStatus } from "domain/member/value-object/activity-status";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

export interface IMember {
  name: string;
  email: string;
  activityStatus: ActivityStatus;
  exerciseListID: Identifier;
}

export class Member extends AggregateRoot<IMember> {
  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get status(): ActivityStatus {
    return this.props.activityStatus;
  }

  public get exerciseList(): Identifier {
    return this.props.exerciseListID;
  }

  public static create(props: IMember): Member {
    this.checkProps(props);

    return new Member(props);
  }

  public static rebuild(id: Identifier, props: IMember): Member {
    this.checkProps(props);

    return new Member(props, id);
  }

  public changeName(name: string): Member {
    Member.checkProps({ name });

    this.props.name = name;

    return this;
  }

  public changeEmail(email: string): Member {
    Member.checkProps({ email });

    this.props.email = email;

    return this;
  }

  public changeActivityStatus(activityStatus: ActivityStatus): Member {
    this.props.activityStatus = activityStatus;

    return this;
  }

  private static checkProps(props: Partial<IMember>): void {
    if (props.name !== undefined ? props.name === "" : false) {
      throw new Error("Illegal name value.");
    }
    if (props.email !== undefined ? props.email === "" : false) {
      throw new Error("Illegal email value.");
    }
  }
}
