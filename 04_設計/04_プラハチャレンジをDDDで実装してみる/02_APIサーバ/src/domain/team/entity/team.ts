import { Member } from "domain/member/entity/member";
import { AggregateRoot } from "domain/__shared__/aggregate-root";
import { Identifier } from "domain/__shared__/identifier";
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
    Team.validateName(props.name);
    Team.validatePairList(props.pairList);

    return new Team(props);
  };

  public static rebuild = (id: Identifier, props: ITeam): Team => {
    Team.validateName(props.name);
    Team.validatePairList(props.pairList);

    return new Team(props, id);
  };

  public getMemberList = (): Member[] =>
    this.pairList.reduce(
      (memberList: Member[], pair) => memberList.concat(pair.memberList),
      [],
    );

  public equals = (team: Team): boolean => team.id.equals(this.id);

  public updatePairList = (pairList: Pair[]): Team => {
    Team.validatePairList(pairList);

    this.props.pairList = pairList;

    return this;
  };

  private static validateName = (name: string): void => {
    if (!new RegExp("^[1-9]+$").test(name)) {
      throw new Error("Team name can be set with numeric character.");
    }
  };

  private static validatePairList = (pairList: Pair[]): void => {
    if (!(Team.numberOfMember(pairList) >= 3)) {
      throw new Error("Team requires 3 or more members");
    }
  };

  private static numberOfMember = (pairList: Pair[]): number =>
    pairList
      .map((pair) => pair.memberList.length)
      .reduce((acc, cur) => acc + cur);
}
