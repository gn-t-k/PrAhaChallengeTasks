import {
  Pair as IPairData,
  Team as ITeamData,
  MemberOnPair as IMemberOnPairData,
  PrismaClient,
} from "@prisma/client";
import { Context } from "infra/db/context";
import {
  IGetAllMemberQueryService,
  GetAllMemberDTO,
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

  public async execute(): Promise<GetAllMemberDTO> {
    const [teamDataList, memberDataList] = await Promise.all([
      this.prisma.team.findMany({
        include: { pair: { include: { member: true } } },
      }),
      this.prisma.member.findMany(),
    ]);

    const memberList: GetAllMemberDTO = memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;

      return { id, name, email, activityStatus, pairID: null, teamID: null };
    });
    teamDataList.forEach((nestedTeamData: INestedTeamData) => {
      const teamID = nestedTeamData.id;

      nestedTeamData.pair.forEach((nestedPairData: INestedPairData) => {
        const pairID = nestedPairData.id;

        nestedPairData.member.forEach((memberOnPair: IMemberOnPairData) => {
          const memberID = memberOnPair.memberId;
          const targetMember = memberList.find(
            (member) => member.id === memberID,
          );

          if (targetMember) {
            targetMember.pairID = pairID;
            targetMember.teamID = teamID;
          }
        });
      });
    });

    return memberList;
  }
}
