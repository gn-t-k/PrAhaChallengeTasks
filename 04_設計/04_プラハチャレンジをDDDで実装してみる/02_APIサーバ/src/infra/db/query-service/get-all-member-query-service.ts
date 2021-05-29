import {
  Member as IMemberData,
  Pair as IPairData,
  Team as ITeamData,
  MemberOnPair as IMemberOnPairData,
  PrismaClient,
} from "@prisma/client";
import { Context } from "infra/db/context";
import {
  convertMemberOnPairDataToMemberDTO,
  convertMemberDataToMemberDTO,
  convertPairDataToPairDTO,
  convertTeamDataToTeamDTO,
} from "infra/db/util/convert-to-dto";
import {
  MemberDTO,
  PairDTO,
  TeamDTO,
} from "usecase/query-service-interface/domain-dtos";
import {
  IGetAllMemberQueryService,
  GetAllMemberDTO,
} from "usecase/query-service-interface/get-all-member-query-service";

type INestedTeamData = ITeamData & {
  pair: INestedPairData[];
};
type INestedPairData = IPairData & {
  member: IMemberOnPairData[];
};

export class GetAllMemberQueryService implements IGetAllMemberQueryService {
  private readonly prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public async execute(): Promise<GetAllMemberDTO> {
    const [teamDataList, memberDataList] = await Promise.all([
      this.prisma.team.findMany({
        include: { pair: { include: { member: true } } },
      }),
      this.prisma.member.findMany(),
    ]);

    const teamList: TeamDTO[] = GetAllMemberQueryService.getTeamList(
      teamDataList,
      memberDataList,
    );
    const independentMemberList: MemberDTO[] = GetAllMemberQueryService.getIndependentMemberList(
      teamList,
      memberDataList.map((memberData) =>
        convertMemberDataToMemberDTO(memberData),
      ),
    );

    return { teamList, independentMemberList };
  }

  private static getTeamList(
    nestedTeamDataList: INestedTeamData[],
    memberDataList: IMemberData[],
  ): TeamDTO[] {
    return nestedTeamDataList.map((nestedTeamData) => {
      const teamData: ITeamData = {
        id: nestedTeamData.id,
        name: nestedTeamData.name,
        createdAt: nestedTeamData.createdAt,
        updatedAt: nestedTeamData.updatedAt,
      };

      const pairDTOList: PairDTO[] = nestedTeamData.pair.map(
        (nestedPairData) => {
          const pairData: IPairData = {
            id: nestedPairData.id,
            name: nestedPairData.name,
            teamId: nestedTeamData.id,
            createdAt: nestedPairData.createdAt,
            updatedAt: nestedPairData.updatedAt,
          };

          const memberDTOList: MemberDTO[] = convertMemberOnPairDataToMemberDTO(
            nestedPairData.member,
            memberDataList,
          );

          return convertPairDataToPairDTO(pairData, memberDTOList);
        },
      );

      return convertTeamDataToTeamDTO(teamData, pairDTOList);
    });
  }

  private static getIndependentMemberList(
    teamDTOList: TeamDTO[],
    memberDTOList: MemberDTO[],
  ): MemberDTO[] {
    const memberBelongingToPairList: MemberDTO[] = teamDTOList
      .reduce((pl: PairDTO[], t: TeamDTO) => pl.concat(t.pairList), [])
      .reduce((ml: MemberDTO[], p: PairDTO) => ml.concat(p.memberList), []);

    return memberDTOList.filter(
      (memberDTO) =>
        !memberBelongingToPairList.map((m) => m.id).includes(memberDTO.id),
    );
  }
}
