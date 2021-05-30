import {
  Member as IMemberData,
  Pair as IPairData,
  Team as ITeamData,
  MemberOnPair as IMemberOnPairData,
} from "@prisma/client";
import {
  MemberDTO,
  PairDTO,
  TeamDTO,
} from "usecase/query-service-interface/domain-dtos";

export const convertMemberOnPairDataToMemberDTO = (
  memberOnPairDataList: IMemberOnPairData[],
  memberDataList: IMemberData[],
): MemberDTO[] =>
  memberDataList
    .filter((memberData: IMemberData) =>
      memberOnPairDataList
        .map((memberOnPairData: IMemberOnPairData) => memberOnPairData.memberId)
        .includes(memberData.id),
    )
    .map(
      (filteredMemberData: IMemberData): MemberDTO =>
        convertMemberDataToMemberDTO(filteredMemberData),
    );

export const convertMemberDataToMemberDTO = (
  memberData: IMemberData,
): MemberDTO => {
  const { id, name, email, activityStatus } = memberData;

  return { id, name, email, activityStatus };
};

export const convertPairDataToPairDTO = (
  pairData: IPairData,
  memberDTOList: MemberDTO[],
): PairDTO => {
  const { id, name } = pairData;
  const memberList = memberDTOList;

  return {
    id,
    name,
    memberList,
  };
};

export const convertTeamDataToTeamDTO = (
  teamData: ITeamData,
  pairDTOList: PairDTO[],
): TeamDTO => {
  const { id, name } = teamData;
  const pairList = pairDTOList;

  return {
    id,
    name,
    pairList,
  };
};
