import { Pair as IPairData } from "@prisma/client";
import { Identifier } from "domain/shared/identifier";
import { Member } from "domain/team/entity/member";
import { Pair } from "domain/team/entity/pair";

export const convertPairDataToEntity = (
  pairData: IPairData,
  memberList: Member[],
): Pair => {
  const { id, name } = pairData;

  return Pair.rebuild(new Identifier(id), {
    name,
    memberList,
  });
};
