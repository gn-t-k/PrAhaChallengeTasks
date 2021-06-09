import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetMemberByTeamNameQueryService } from "infra/db/query-service/get-member-by-team-name-query-service";
import {
  memberDataList,
  memberOnPairDataList,
  pairDataList,
  teamData,
} from "test/stub/infra/db/query-service/get-member-by-team-name-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByTeamNameQueryService", () => {
  describe("チーム名で参加者を取得できる", () => {
    test("teamIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(teamData);
      mockContext.prisma.pair.findMany.mockResolvedValue(pairDataList);
      mockContext.prisma.memberOnPair.findMany.mockResolvedValue(
        memberOnPairDataList,
      );
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const memberList = await new GetMemberByTeamNameQueryService(
        context,
      ).execute("1");

      expect(memberList.every((m) => m.teamID === teamData.id)).toBe(true);
    });

    test("pairIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(teamData);
      mockContext.prisma.pair.findMany.mockResolvedValue(pairDataList);
      mockContext.prisma.memberOnPair.findMany.mockResolvedValue(
        memberOnPairDataList,
      );
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const memberList = await new GetMemberByTeamNameQueryService(
        context,
      ).execute("1");

      const pairIDList = pairDataList.map((pairData) => pairData.id);

      const isAllPairIDIncluded = memberList.every((member) =>
        pairIDList.includes(member.pairID),
      );

      expect(isAllPairIDIncluded).toBe(true);
    });
  });
  test("存在しないチーム名だった場合エラーになる");
});
