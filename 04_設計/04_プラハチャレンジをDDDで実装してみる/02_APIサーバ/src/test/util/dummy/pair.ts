import { Member } from "domain/member/entity/member";
import { Pair, IPair } from "domain/member/entity/pair";
import faker from "faker";

export const makeDummyPairProps = (memberList: Member[]): IPair => {
  const name = faker.random.alpha();

  return { name, memberList };
};

export const makeDummyPair = (memberList: Member[]): Pair => {
  const { name } = makeDummyPairProps(memberList);

  return new Pair({ name, memberList });
};
