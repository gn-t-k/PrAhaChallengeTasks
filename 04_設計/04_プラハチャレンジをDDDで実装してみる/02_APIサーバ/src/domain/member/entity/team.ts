import { Pair } from "domain/member/entity/pair";
import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";

export interface ITeam {
  name: string;
  pairList: Pair[];
}
export class Team extends Entity<ITeam> {
  public get name(): string {
    return this.props.name;
  }

  public get pairList(): Pair[] {
    return this.props.pairList;
  }

  public static create(props: ITeam): Team {
    this.checkProps(props);

    return new Team(props);
  }

  public static rebuild(id: Identifier, props: ITeam): Team {
    this.checkProps(props);

    return new Team(props, id);
  }

  private static checkProps(props: ITeam): void {
    if (!new RegExp("^[1-9]+$").test(props.name)) {
      throw new Error("Team name can be set with numeric character.");
    }
    if (!(this.numberOfMember(props.pairList) >= 3)) {
      throw new Error("Team requires 3 or more members");
    }
  }

  private static numberOfMember(pairList: Pair[]): number {
    return pairList
      .map((pair) => pair.memberList.length)
      .reduce((acc, cur) => acc + cur);
  }
}
