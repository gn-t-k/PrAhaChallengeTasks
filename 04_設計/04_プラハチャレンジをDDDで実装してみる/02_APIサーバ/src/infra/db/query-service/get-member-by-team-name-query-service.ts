import { MemberOnPair, PrismaClient } from "@prisma/client";
import { Context } from "infra/db/context";
import {
  GetMemberByTeamNameDTO,
  IGetMemberByTeamNameQueryService,
} from "usecase/query-service-interface/get-member-by-team-name-query-service";

export class GetMemberByTeamNameQueryService
  implements IGetMemberByTeamNameQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (
    teamName: string,
  ): Promise<GetMemberByTeamNameDTO> => {
    const teamData = await this.prisma.team.findUnique({
      where: {
        name: teamName,
      },
    });

    if (teamData === null) {
      throw new Error(`Team named ${teamName} is not exists`);
    }

    const pairDataList = await this.prisma.pair.findMany({
      where: {
        teamId: teamData.id,
      },
    });

    if (!pairDataList) {
      throw new Error(`Team ${teamName} has no pair`);
    }

    const memberOnPairPromiseList = pairDataList.map((pairData) =>
      this.prisma.memberOnPair.findMany({
        where: {
          pairId: pairData.id,
        },
      }),
    );
    const memberOnPairData = await Promise.all(memberOnPairPromiseList);

    const flattedMemberOnPairData = memberOnPairData.reduce(
      (acc: MemberOnPair[], cur: MemberOnPair[]) => acc.concat(cur),
      [],
    );
    const memberPromiseList = flattedMemberOnPairData.map((mop) =>
      this.prisma.member.findUnique({
        where: {
          id: mop.memberId,
        },
      }),
    );
    const memberDataList = await Promise.all(memberPromiseList);

    return memberDataList.map((memberData) => {
      if (memberData === null) {
        // コンパイルエラー避けのエラー。ダサい。
        throw new Error();
      }

      const { id, name, email, activityStatus } = memberData;
      const pairID = flattedMemberOnPairData.find((mop) => mop.memberId === id)
        ?.pairId;
      const teamID = teamData.id;

      if (pairID === undefined) {
        // コンパイルエラー避けのエラー。ダサい。
        throw new Error();
      }

      return {
        id,
        name,
        email,
        activityStatus,
        pairID,
        teamID,
      };
    });
  };
}
