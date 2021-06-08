import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";
import { Pair } from "domain/team/entity/pair";

export interface ITeam {
  name: string;
  pairList: Pair[];
}
export class Team extends AggregateRoot<ITeam> {
  public get name(): string {
    return this.props.name;
  }

  public get pairList(): Pair[] {
    return this.props.pairList;
  }

  public static create = (props: ITeam): Team => {
    Team.checkProps(props);

    return new Team(props);
  };

  public static rebuild = (id: Identifier, props: ITeam): Team => {
    Team.checkProps(props);

    return new Team(props, id);
  };

  public equals = (team: Team): boolean => team.id.equals(this.id);

  private static checkProps = (props: ITeam): void => {
    if (!new RegExp("^[1-9]+$").test(props.name)) {
      throw new Error("Team name can be set with numeric character.");
    }
    if (!(Team.numberOfMember(props.pairList) >= 3)) {
      throw new Error("Team requires 3 or more members");
    }
  };

  private static numberOfMember = (pairList: Pair[]): number =>
    pairList
      .map((pair) => pair.memberList.length)
      .reduce((acc, cur) => acc + cur);
}
