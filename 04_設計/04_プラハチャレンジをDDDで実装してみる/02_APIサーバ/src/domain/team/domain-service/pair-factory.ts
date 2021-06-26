import { Member } from "domain/member/entity/member";
import { Identifier } from "domain/__shared__/identifier";
import { Pair } from "domain/team/entity/pair";

interface IProps {
  id: string;
  name: string;
  memberList: Member[];
}

export class PairFactory {
  public static execute = (props: IProps): Pair => {
    const { id, name, memberList } = props;

    return Pair.rebuild(new Identifier(id), {
      name,
      memberList,
    });
  };
}
