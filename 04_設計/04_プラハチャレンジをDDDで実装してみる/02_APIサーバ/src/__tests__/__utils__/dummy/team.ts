import faker from "faker";
import { makeDummyPair } from "__tests__/__utils__/dummy/pair";
import { ITeam, Team } from "domain/team/entity/team";

export const makeDummyTeamProps = (): ITeam => {
  const name = String(faker.datatype.number({ min: 1, max: 9 }));
  const pairList = [makeDummyPair(), makeDummyPair()];

  return { name, pairList };
};

export const makeDummyTeam = (): Team => {
  const { name, pairList } = makeDummyTeamProps();

  return Team.create({ name, pairList });
};
