import { makeDummyMember } from "test/util/dummy/member";
import { Pair, IPair } from "domain/member/entity/pair";
import faker from "faker";

export const makeDummyPairProps = (): IPair => {
  const name = faker.random.alpha();
  const memberList = [makeDummyMember(), makeDummyMember()];

  return { name, memberList };
};

export const makeDummyPair = (): Pair => {
  const { name, memberList } = makeDummyPairProps();

  return Pair.create({ name, memberList });
};
