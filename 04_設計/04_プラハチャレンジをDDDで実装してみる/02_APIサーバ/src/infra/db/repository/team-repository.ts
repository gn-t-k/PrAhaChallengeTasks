import {
  Member as MemberData,
  MemberOnPair as MemberOnPairData,
  Pair as PairData,
  Team as TeamData,
  PrismaClient,
} from "@prisma/client";
import { MemberFactory } from "domain/member/service/member-factory";
import { PairFactory } from "domain/team/domain-service/pair-factory";
import { TeamFactory } from "domain/team/domain-service/team-factory";
import { Team } from "domain/team/entity/team";
import {
  ITeamRepository,
  IGetTeamByPairID,
} from "domain/team/team-repository-interface";
import { Context } from "infra/db/context";

type NestedTeamData = TeamData & {
  pair: NestedPairData[];
};
type NestedPairData = PairData & {
  member: MemberOnPairData[];
};

export class TeamRepository implements ITeamRepository {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public get = async (props: IGetTeamByPairID): Promise<Team> => {
    const nestedTeamData = await this.getNestedTeamData(props.pairID);
    const memberDataList = await this.getMemberDataList(nestedTeamData);
    const pairList = TeamRepository.makePairList(
      nestedTeamData,
      memberDataList,
    );
    const { id, name } = nestedTeamData;

    return TeamFactory.execute({
      id,
      name,
      pairList,
    });
  };

  // public addMemberToPair = (team: Team): Promise<void> => {};

  private getNestedTeamData = async (pairID: string) => {
    const pairDataForTeamID = await this.prisma.pair.findUnique({
      where: {
        id: pairID,
      },
      select: {
        teamId: true,
      },
    });

    if (pairDataForTeamID === null) {
      throw new Error("Pair not exists");
    }

    const nestedTeamData = await this.prisma.team.findUnique({
      where: {
        id: pairDataForTeamID.teamId,
      },
      include: {
        pair: {
          include: {
            member: true,
          },
        },
      },
    });

    if (nestedTeamData === null) {
      // TODO: データ不整合時にしか起こらないエラーのため、ログ出すなどする
      throw new Error("Team not exists");
    }

    return nestedTeamData;
  };

  private getMemberDataList = async (nestedTeamData: NestedTeamData) => {
    const memberIDList = nestedTeamData.pair.reduce(
      (memberIDDataList: string[], pairData) =>
        memberIDDataList.concat(pairData.member.map((m) => m.memberId)),
      [],
    );

    const memberDataList = await this.prisma.member.findMany({
      where: {
        id: {
          in: memberIDList,
        },
      },
    });

    return memberDataList;
  };

  private static makePairList = (
    nestedTeamData: NestedTeamData,
    memberDataList: MemberData[],
  ) =>
    nestedTeamData.pair.map((pairData) => {
      const { id, name } = pairData;
      const memberList = pairData.member.map((mop) => {
        const memberData = memberDataList.find((m) => m.id === mop.memberId);

        if (memberData === undefined) {
          // TODO: データ不整合時にしか起こらないエラーのため、ログ出すなどする
          throw new Error("Member not exists");
        }

        return MemberFactory.execute(memberData);
      });

      return PairFactory.execute({ id, name, memberList });
    });
}
