import { Member } from "domain/member/entity/member";

export interface IPair {
  id: string;
  name: string;
  memberList: Member[];
}
export class Pair {
  private props: IPair;

  constructor(id: string, name: string, memberList: Member[]) {
    if (!new RegExp("^[a-z]$").test(name)) {
      throw new Error("Pair name can be set with one alphabetic character.");
    }
    if (memberList.length < 2 || memberList.length > 3) {
      throw new Error("2 or more and 3 or less member belong to pair.");
    }

    this.props = { id, name, memberList };
  }

  public get name(): string {
    return this.props.name;
  }

  public get memberList(): Member[] {
    return this.props.memberList;
  }
}
