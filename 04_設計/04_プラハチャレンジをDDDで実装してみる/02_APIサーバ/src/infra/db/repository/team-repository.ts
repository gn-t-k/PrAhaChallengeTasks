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
  IGetTeamByID,
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

  public getByID = async (props: IGetTeamByID): Promise<Team> => {
    const nestedTeamData = await this.getNestedTeamData(props.id);
    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public getByPairID = async (props: IGetTeamByPairID): Promise<Team> => {
    const nestedTeamData = await this.getNestedTeamDataByPairID(props.pairID);
    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public addMemberToPair = async (team: Team): Promise<void> => {
    const currentTeam = await this.getByID({ id: team.id.value });
    // TODO: 新しく追加するメンバーを抽出する
  };

  private getTeam = async (nestedTeamData: NestedTeamData): Promise<Team> => {
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

  private getNestedTeamData = async (id: string) => {
    const nestedTeamData = await this.prisma.team.findUnique({
      where: {
        id,
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

  private getNestedTeamDataByPairID = async (pairID: string) => {
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

    const nestedTeamData = await this.getNestedTeamData(
      pairDataForTeamID.teamId,
    );

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
