import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";
import { ActivityStatus } from "domain/team/value-object/activity-status";

export interface IMember {
  name: string;
  email: string;
  activityStatus: ActivityStatus;
}

export class Member extends Entity<IMember> {
  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get status(): ActivityStatus {
    return this.props.activityStatus;
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
