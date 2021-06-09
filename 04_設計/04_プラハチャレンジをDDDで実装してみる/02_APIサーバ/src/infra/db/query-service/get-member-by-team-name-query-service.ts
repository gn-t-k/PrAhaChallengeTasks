import { Member, MemberOnPair, Pair, PrismaClient, Team } from "@prisma/client";
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
    const teamData = await this.getTeamData(teamName);
    const pairDataList = await this.getPairDataList(teamData.id);
    const memberOnPairDataList = await this.getMemberOnPairDataList(
      pairDataList,
    );
    const memberDataList = await this.getMemberDataList(memberOnPairDataList);

    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;
      const pairID = memberOnPairDataList.find((mop) => mop.memberId === id)
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

  private getTeamData = async (teamName: string): Promise<Team> => {
    const teamData = await this.prisma.team.findUnique({
      where: {
        name: teamName,
      },
    });

    if (teamData === null) {
      throw new Error(`Team named ${teamName} is not exists`);
    }

    return teamData;
  };

  private getPairDataList = async (teamId: string): Promise<Pair[]> => {
    const pairDataList = await this.prisma.pair.findMany({
      where: {
        teamId,
      },
    });

    if (pairDataList.length === 0) {
      throw new Error(`Team has no pair`);
    }

    return pairDataList;
  };

  private getMemberOnPairDataList = async (pairDataList: Pair[]) => {
    const pairIDDataList = pairDataList.map((p) => p.id);
    const memberOnPairDataList = await this.prisma.memberOnPair.findMany({
      where: {
        pairId: {
          in: pairIDDataList,
        },
      },
    });

    return memberOnPairDataList;
  };

  private getMemberDataList = async (
    memberOnPairDataList: MemberOnPair[],
  ): Promise<Member[]> => {
    const memberIDDataList = memberOnPairDataList.map((mop) => mop.memberId);
    const memberDataList = await this.prisma.member.findMany({
      where: {
        id: {
          in: memberIDDataList,
        },
      },
    });

    return memberDataList.map((memberData) => {
      if (memberData === null) {
        // コンパイルエラー避けのエラー。ダサい。
        throw new Error();
      }

      return memberData;
    });
  };
}
