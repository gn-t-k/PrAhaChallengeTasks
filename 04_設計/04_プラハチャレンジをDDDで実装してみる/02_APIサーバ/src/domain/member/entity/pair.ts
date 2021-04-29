import { Member } from "domain/member/entity/member";

export class Pair {
  private id_: string;
  private name_: string;
  private memberList_: Member[];

  constructor(id: string, name: string, memberList: Member[]) {
    this.id_ = id;
    this.name_ = name;
    this.memberList_ = memberList;
  }

  public get name(): string {
    return this.name_;
  }
}
