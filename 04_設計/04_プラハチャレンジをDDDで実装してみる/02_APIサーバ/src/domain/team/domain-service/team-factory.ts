import { Identifier } from "domain/__shared__/identifier";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";

interface IProps {
  id: string;
  name: string;
  pairList: Pair[];
}

export class TeamFactory {
  public static execute = (props: IProps): Team => {
    const { id, name, pairList } = props;

    return Team.rebuild(new Identifier(id), {
      name,
      pairList,
    });
  };
}
