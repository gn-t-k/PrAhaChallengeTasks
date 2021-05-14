import { makeDummyPair } from "test/util/dummy/pair";
import { ITeam, Team } from "domain/member/entity/team";
import faker from "faker";

export const makeDummyTeamProps = (): ITeam => {
  const name = String(faker.datatype.number({ min: 1, max: 9 }));
  const pairList = [makeDummyPair(), makeDummyPair()];

  return { name, pairList };
};

export const makeDummyTeam = (): Team => {
  const { name, pairList } = makeDummyTeamProps();

  return Team.create({ name, pairList });
};
