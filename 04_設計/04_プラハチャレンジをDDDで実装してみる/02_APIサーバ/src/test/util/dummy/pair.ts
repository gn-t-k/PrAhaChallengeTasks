import { Member } from "domain/member/entity/member";
import { Pair, IPair } from "domain/member/entity/pair";
import faker from "faker";

export const makeDummyPairProps = (memberList: Member[]): IPair => {
  const id = faker.lorem.slug();
  const name = faker.random.alpha();

  return { id, name, memberList };
};

export const makeDummyPair = (memberList: Member[]): Pair => {
  const { id, name } = makeDummyPairProps(memberList);

  return new Pair({ id, name, memberList });
};
