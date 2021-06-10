import { MemberOnPair, Pair, PrismaClient } from "@prisma/client";
import { Context } from "infra/db/context";
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
    const teamData = await this.prisma.team.findUnique({
      where: {
        name: teamName,
      },
    });

    if (teamData === null) {
      throw new Error(`Team named ${teamName} is not exists`);
    }

    const nestedPairData: NestedPairData | null = await this.prisma.pair.findUnique(
      {
        where: {
          name_teamId: {
            name: pairName,
            teamId: teamData.id,
          },
        },
        include: {
          member: true,
        },
      },
    );

    if (nestedPairData === null) {
      throw new Error(`Pair named ${pairName} is not exists`);
    }

    const memberIDDataList = nestedPairData?.member.map((mop) => mop.memberId);
    const memberDataList = await this.prisma.member.findMany({
      where: {
        id: {
          in: memberIDDataList,
        },
      },
    });

    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;
      const teamID = teamData.id;
      const pairID = nestedPairData.id;

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
}
