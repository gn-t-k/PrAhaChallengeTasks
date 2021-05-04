import { Member } from "domain/member/entity/member";

export interface IPair {
  id: string;
  name: string;
  memberList: Member[];
}
export class Pair {
  private props: IPair;

  constructor(props: IPair) {
    if (!new RegExp("^[a-z]$").test(props.name)) {
      throw new Error("Pair name can be set with one alphabetic character.");
    }
    if (props.memberList.length < 2 || props.memberList.length > 3) {
      throw new Error("2 or more and 3 or less member belong to pair.");
    }

    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get memberList(): Member[] {
    return this.props.memberList;
  }
}
