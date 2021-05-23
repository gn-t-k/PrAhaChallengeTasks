import faker from "faker";
import { Pair, IPair } from "domain/team/entity/pair";
import { makeDummyMember } from "test/util/dummy/member";

export const makeDummyPairProps = (): IPair => {
  const name = faker.random.alpha();
  const memberList = [makeDummyMember(), makeDummyMember()];

  return { name, memberList };
};

export const makeDummyPair = (): Pair => {
  const { name, memberList } = makeDummyPairProps();

  return Pair.create({ name, memberList });
};
