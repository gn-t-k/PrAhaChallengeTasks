import { Member as IMemberData, PrismaClient } from "@prisma/client";
import { Identifier } from "domain/shared/identifier";
import { Member } from "domain/team/entity/member";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";
import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";
import { ActivityStatus } from "domain/team/value-object/activity-status";

const prisma = new PrismaClient();

export class TeamRepository implements ITeamRepository {
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<ITeamStructure> {
    const teamDataList = await prisma.team.findMany({
      include: { pair: { include: { member: true } } },
    });
    const memberDataList = await prisma.member.findMany();

    const memberList = TeamRepository.memberFactory(memberDataList);

    const teamList: Team[] = teamDataList.map((teamData) => {
      const pairList = teamData.pair.map((pairData) => {
        const memberIdList = pairData.member.map(
          (memberOnPair) => memberOnPair.memberId,
        );

        return Pair.rebuild(new Identifier(pairData.id), {
          name: pairData.name,
          memberList: memberList.filter((member) =>
            memberIdList.includes(member.id.value),
          ),
        });
      });

      return Team.rebuild(new Identifier(teamData.id), {
        name: teamData.name,
        pairList,
      });
    });
    const independentMemberList: Member[] = TeamRepository.getIndependentMemberList(
      memberList,
      teamList,
    );

    return { teamList, independentMemberList };
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

  private static getIndependentMemberList(
    memberList: Member[],
    teamList: Team[],
  ): Member[] {
    const memberListBelongingToPair: Member[] = [];
    teamList.forEach((team) => {
      team.pairList.forEach((pair) => {
        pair.memberList.forEach((member) => {
          memberListBelongingToPair.push(member);
        });
      });
    });

    return memberList.filter(
      (member) => !memberListBelongingToPair.includes(member),
    );
  }
}
