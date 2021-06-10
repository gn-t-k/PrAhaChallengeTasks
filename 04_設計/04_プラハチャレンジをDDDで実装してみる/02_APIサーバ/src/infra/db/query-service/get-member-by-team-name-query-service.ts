import { Member, MemberOnPair, Pair, PrismaClient, Team } from "@prisma/client";
import { Context } from "infra/db/context";
import {
  GetMemberByTeamNameDTO,
  IGetMemberByTeamNameQueryService,
} from "usecase/query-service-interface/get-member-by-team-name-query-service";

type NestedTeamData = Team & {
  pair: NestedPairData[];
};
type NestedPairData = Pair & {
  member: MemberOnPair[];
};

export class GetMemberByTeamNameQueryService
  implements IGetMemberByTeamNameQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (
    teamName: string,
  ): Promise<GetMemberByTeamNameDTO> => {
    const nestedTeamData: NestedTeamData | null = await this.prisma.team.findUnique(
      {
        where: {
          name: teamName,
        },
        include: {
          pair: {
            include: {
              member: true,
            },
          },
        },
      },
    );

    if (nestedTeamData === null) {
      throw new Error(`Team named ${teamName} is not exists`);
    }

    const memberOnPairDataList = nestedTeamData.pair.reduce(
      (mop: MemberOnPair[], p: NestedPairData) => mop.concat(p.member),
      [],
    );
    const memberDataList = await this.getMemberDataList(memberOnPairDataList);

    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;
      const pairID = memberOnPairDataList.find((mop) => mop.memberId === id)
        ?.pairId;
      const teamID = nestedTeamData.id;

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

    return memberDataList;
  };
}
