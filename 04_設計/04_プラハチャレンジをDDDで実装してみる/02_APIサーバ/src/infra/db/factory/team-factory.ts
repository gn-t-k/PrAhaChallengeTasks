import { Team as ITeamData } from "@prisma/client";
import { Identifier } from "domain/shared/identifier";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";

export const convertTeamDataToEntity = (
  teamData: ITeamData,
  pairList: Pair[],
): Team => {
  const { id, name } = teamData;

  return Team.rebuild(new Identifier(id), {
    name,
    pairList,
  });
};
