import { Member } from "domain/member/entity/member";
import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";

export interface IPair {
  name: string;
  memberList: Member[];
}
export class Pair extends Entity<IPair> {
  public get name(): string {
    return this.props.name;
  }

  public get memberList(): Member[] {
    return this.props.memberList;
  }

  public static create = (props: IPair): Pair => {
    Pair.validateName(props.name);
    Pair.validateMemberList(props.memberList);

    return new Pair(props);
  };

  public static rebuild = (id: Identifier, props: IPair): Pair => {
    Pair.validateName(props.name);
    Pair.validateMemberList(props.memberList);

    return new Pair(props, id);
  };

  public equals = (pair: Pair): boolean => pair.id.equals(this.id);

  public addMember = (member: Member): Pair => {
    const memberList = this.props.memberList.concat(member);

    Pair.validateMemberList(memberList);

    this.props.memberList = memberList;

    return this;
  };

  private static validateName = (name: string): void => {
    if (!new RegExp("^[a-z]$").test(name)) {
      throw new Error("Pair name can be set with one alphabetic character.");
    }
  };

  private static validateMemberList = (memberList: Member[]): void => {
    if (memberList.length < 2 || memberList.length > 3) {
      throw new Error("2 or more and 3 or less member belong to pair.");
    }
  };
}
