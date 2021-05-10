import { Pair } from "domain/member/entity/pair";

export interface ITeam {
  id: string;
  name: string;
  pairList: Pair[];
}
export class Team {
  private props: ITeam;

  constructor(props: ITeam) {
    if (!new RegExp("^[1-9]+$").test(props.name)) {
      throw new Error("Team name can be set with numeric character.");
    }
    if (!(numberOfMember(props.pairList) >= 3)) {
      throw new Error("Team requires 3 or more members");
    }

    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get pairList(): Pair[] {
    return this.props.pairList;
  }
}

const numberOfMember = (pairList: Pair[]): number =>
  pairList
    .map((pair) => pair.memberList.length)
    .reduce((acc, cur) => acc + cur);
