import {
  Pair as IPairData,
  Team as ITeamData,
  MemberOnPair as IMemberOnPairData,
  PrismaClient,
} from "@prisma/client";
import { Member } from "domain/team/entity/member";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";
import { Context } from "infra/db/context";
import {
  convertMemberDataToEntity,
  convertMemberOnPairToMember,
} from "infra/db/factory/member-factory";
import { convertPairDataToEntity } from "infra/db/factory/pair-factory";
import { convertTeamDataToEntity } from "infra/db/factory/team-factory";
import {
  IGetAllMemberQueryService,
  ITeamStructure,
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

  public async execute(): Promise<ITeamStructure> {
    const [teamDataList, memberDataList] = await Promise.all([
      this.prisma.team.findMany({
        include: { pair: { include: { member: true } } },
      }),
      this.prisma.member.findMany(),
    ]);

    const allMemberList = memberDataList.map((memberData) =>
      convertMemberDataToEntity(memberData),
    );

    const teamList: Team[] = GetAllMemberQueryService.getTeamList(
      teamDataList,
      allMemberList,
    );
    const independentMemberList: Member[] = GetAllMemberQueryService.getIndependentMemberList(
      teamList,
      allMemberList,
    );

    return { teamList, independentMemberList };
  }

  private static getTeamList(
    teamDataList: INestedTeamData[],
    allMemberList: Member[],
  ): Team[] {
    return teamDataList.map((teamData) => {
      const pairList: Pair[] = teamData.pair.map((pairData) => {
        const memberList: Member[] = convertMemberOnPairToMember(
          pairData.member,
          allMemberList,
        );

        return convertPairDataToEntity(pairData, memberList);
      });

      return convertTeamDataToEntity(teamData, pairList);
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
}
