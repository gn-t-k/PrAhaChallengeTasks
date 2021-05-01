import { Pair } from "domain/member/entity/pair";

export interface ITeam {
  id: string;
  name: string;
  pairList: Pair[];
}
export class Team {
  private props: ITeam;

  constructor(id: string, name: string, pairList: Pair[]) {
    if (!new RegExp("^[1-9]+$").test(name)) {
      throw new Error("Team name can be set with numeric character.");
    }
    if (
      !(
        pairList
          .map((pair) => pair.memberList.length)
          .reduce((acc, cur) => acc + cur) >= 3
      )
    ) {
      throw new Error("Team requires 3 or more members");
    }

    this.props = { id, name, pairList };
  }

  public get name(): string {
    return this.props.name;
  }

  public get pairList(): Pair[] {
    return this.props.pairList;
  }
}
