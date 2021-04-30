import { Pair } from "domain/member/entity/pair";

export interface ITeam {
  id: string;
  name: string;
  pairList: Pair[];
}
export class Team {
  private props: ITeam;

  constructor(id: string, name: string, pairList: Pair[]) {
    this.props = { id, name, pairList };
  }

  public get name(): string {
    return this.props.name;
  }
}
