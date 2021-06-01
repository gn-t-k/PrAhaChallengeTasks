import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllMemberQueryService } from "infra/db/query-service/get-all-member-query-service";
import {
  allMemberDataList,
  nestedTeamDataList,
} from "test/stub/infra/db/query-service/get-all-member-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllMemberQueryService", () => {
  test("pairIDとteamIDが適切に設定されている", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
    mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

    const memberList = await new GetAllMemberQueryService(context).execute();

    const targetTeamID = nestedTeamDataList[0].id;
    const targetPairID = nestedTeamDataList[0].pair[0].id;
    const targetMemberID = nestedTeamDataList[0].pair[0].member[0].memberId;

    const targetMember = memberList.find(
      (member) => member.id === targetMemberID,
    );

    expect(
      targetMember &&
        targetMember.pairID === targetPairID &&
        targetMember.teamID === targetTeamID,
    ).toBe(true);
  });

  test("pairIDとteamIDがともにnullになっている参加者は、どのペアにも属していない", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
    mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

    const memberList = await new GetAllMemberQueryService(context).execute();

    const independentMemberList = memberList.filter(
      (member) => member.pairID === null && member.teamID === null,
    );
    const isIndependentMemberExist = independentMemberList
      .map((independentMember) => {
        const { id } = independentMember;

        return !nestedTeamDataList.every((nestedTeamData) =>
          nestedTeamData.pair.every((nestedPairData) =>
            nestedPairData.member.every(
              (memberOnPairData) => memberOnPairData.memberId !== id,
            ),
          ),
        );
      })
      .reduce((acc, cur) => acc && cur);

    expect(isIndependentMemberExist).toBe(false);
  });
});
