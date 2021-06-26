import faker from "faker";
import { makeDummyMember } from "__tests__/__utils__/dummy/member";
import { Pair, IPair } from "domain/team/entity/pair";

export const makeDummyPairProps = (): IPair => {
  const name = faker.random.alpha();
  const memberList = [makeDummyMember(), makeDummyMember()];

  return { name, memberList };
};

export const makeDummyPair = (): Pair => {
  const { name, memberList } = makeDummyPairProps();

  return Pair.create({ name, memberList });
};
