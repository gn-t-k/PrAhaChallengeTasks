import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";

export interface IMember {
  name: string;
  email: string;
  readonly activityStatus: ActivityStatus;
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

  public static create = (props: IMember): Member => {
    Member.validateName(props.name);
    Member.validateEmail(props.email);

    return new Member(props);
  };

  public static rebuild = (id: Identifier, props: IMember): Member => {
    Member.validateName(props.name);
    Member.validateEmail(props.email);

    return new Member(props, id);
  };

  public changeName = (name: string): Member => {
    Member.validateName(name);

    this.props.name = name;

    return this;
  };

  public changeEmail = (email: string): Member => {
    Member.validateEmail(email);

    this.props.email = email;

    return this;
  };

  public equals = (member: Member): boolean => member.id.equals(this.id);

  private static validateName = (name: string): void => {
    if (name !== undefined ? name === "" : false) {
      throw new Error("Illegal name value.");
    }
  };

  private static validateEmail = (email: string): void => {
    if (email !== undefined ? email === "" : false) {
      throw new Error("Illegal email value.");
    }
  };
}
