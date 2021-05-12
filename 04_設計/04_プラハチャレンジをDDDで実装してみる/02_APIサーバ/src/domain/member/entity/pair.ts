import { Member } from "domain/member/entity/member";
import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";

export interface IPair {
  name: string;
  memberList: Member[];
}
export class Pair extends Entity<IPair> {
  constructor(props: IPair, id?: Identifier) {
    if (!new RegExp("^[a-z]$").test(props.name)) {
      throw new Error("Pair name can be set with one alphabetic character.");
    }
    if (props.memberList.length < 2 || props.memberList.length > 3) {
      throw new Error("2 or more and 3 or less member belong to pair.");
    }

    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get memberList(): Member[] {
    return this.props.memberList;
  }
}
