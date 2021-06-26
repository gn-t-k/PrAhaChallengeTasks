import { Member, MemberOnPair, Pair, PrismaClient } from "@prisma/client";
import { Context } from "infrastructure/db/context";
import {
  GetMemberByPairNameDTO,
  IGetMemberByPairNameQueryService,
} from "usecase/query-service-interface/get-member-by-pair-name-query-service";

type NestedPairData = Pair & {
  member: MemberOnPair[];
};

export class GetMemberByPairNameQueryService
  implements IGetMemberByPairNameQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (
    teamName: string,
    pairName: string,
  ): Promise<GetMemberByPairNameDTO> => {
    const nestedTeamData = await this.prisma.team.findUnique({
      where: {
        name: teamName,
      },
      include: {
        pair: {
          where: {
            name: pairName,
          },
          include: {
            member: true,
          },
        },
      },
    });

    if (nestedTeamData === null) {
      throw new Error(`Team named ${teamName} is not exists`);
    }

    if (nestedTeamData.pair.length === 0) {
      throw new Error(`Pair named ${pairName} is not exists`);
    }

    if (nestedTeamData.pair.length > 1) {
      // TODO: データ不整合時に起きるエラーなので、ログで通知できるようにする（するとは言っていない）
      throw new Error(`Pair name ${pairName} is duplicated in pair table`);
    }

    const teamID = nestedTeamData.id;
    const pairID = nestedTeamData.pair[0].id;
    const memberDataList = await this.getMemberDataList(nestedTeamData.pair);

    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;

      return {
        id,
        name,
        email,
        activityStatus,
        teamID,
        pairID,
      };
    });
  };

  private getMemberDataList = async (
    nestedPairDataList: NestedPairData[],
  ): Promise<Member[]> => {
    const memberIDDataList = nestedPairDataList
      .reduce(
        (memberOnPairDataList: MemberOnPair[], pair: NestedPairData) =>
          memberOnPairDataList.concat(pair.member),
        [],
      )
      .map((mop) => mop.memberId);

    const memberDataList = await this.prisma.member.findMany({
      where: {
        id: {
          in: memberIDDataList,
        },
      },
    });

    return memberDataList;
  };
}
