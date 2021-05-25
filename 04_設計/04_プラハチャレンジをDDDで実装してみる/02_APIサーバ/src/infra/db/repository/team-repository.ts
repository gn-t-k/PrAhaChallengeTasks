import {
  Member as IMemberData,
  Pair as IPairData,
  Team as ITeamData,
  MemberOnPair as IMemberOnPairData,
  PrismaClient,
} from "@prisma/client";
import { Identifier } from "domain/shared/identifier";
import { Member } from "domain/team/entity/member";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";
import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";
import { ActivityStatus } from "domain/team/value-object/activity-status";
import { Context } from "infra/db/context";

type INestedTeamData = ITeamData & {
  pair: INestedPairData[];
};
type INestedPairData = IPairData & {
  member: IMemberOnPairData[];
};

export class TeamRepository implements ITeamRepository {
  private readonly prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public async getAll(): Promise<ITeamStructure> {
    const [teamDataList, memberDataList] = await Promise.all([
      this.prisma.team.findMany({
        include: { pair: { include: { member: true } } },
      }),
      this.prisma.member.findMany(),
    ]);

    const allMemberList = TeamRepository.memberFactory(memberDataList);

    const teamList: Team[] = TeamRepository.convertTeamDataToEntity(
      teamDataList,
      allMemberList,
    );
    const independentMemberList: Member[] = TeamRepository.getIndependentMemberList(
      teamList,
      allMemberList,
    );

    return { teamList, independentMemberList };
  }

  private static convertTeamDataToEntity(
    teamDataList: INestedTeamData[],
    allMemberList: Member[],
  ): Team[] {
    return teamDataList.map((teamData) => {
      const pairList: Pair[] = teamData.pair.map((pairData) => {
        const memberList: Member[] = this.getMemberFromMemberOnPair(
          pairData.member,
          allMemberList,
        );

        return this.pairFactory(pairData, memberList);
      });

      return this.teamFactory(teamData, pairList);
    });
  }

  private static getIndependentMemberList(
    teamList: Team[],
    allMemberList: Member[],
  ): Member[] {
    const memberListBelongingToPair: Member[] = teamList
      .reduce(
        (pairList: Pair[], team: Team) => pairList.concat(team.pairList),
        [],
      )
      .reduce(
        (memberList: Member[], pair: Pair) =>
          memberList.concat(pair.memberList),
        [],
      );

    return allMemberList.filter(
      (member) =>
        memberListBelongingToPair.find((m) => m.equals(member)) === undefined,
    );
  }

  private static memberFactory(memberDataList: IMemberData[]): Member[] {
    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;

      return Member.rebuild(new Identifier(id), {
        name,
        email,
        activityStatus: ActivityStatus.create({ status: activityStatus }),
      });
    });
  }

  private static pairFactory(pairData: IPairData, memberList: Member[]): Pair {
    const { id, name } = pairData;

    return Pair.rebuild(new Identifier(id), {
      name,
      memberList,
    });
  }

  private static teamFactory(teamData: ITeamData, pairList: Pair[]): Team {
    const { id, name } = teamData;

    return Team.rebuild(new Identifier(id), {
      name,
      pairList,
    });
  }

  private static getMemberFromMemberOnPair(
    memberOnPairList: IMemberOnPairData[],
    allMemberList: Member[],
  ): Member[] {
    const memberIdList = memberOnPairList.map(
      (memberOnPair) => memberOnPair.memberId,
    );

    return allMemberList.filter((member) =>
      memberIdList.includes(member.id.value),
    );
  }
}
