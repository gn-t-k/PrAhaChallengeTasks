import {
  memberDataList,
  nestedTeamData,
} from "__tests__/__stubs__/infrastructure/db/query-service/get-member-by-team-name-query-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetMemberByTeamNameQueryService } from "infrastructure/db/query-service/get-member-by-team-name-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByTeamNameQueryService", () => {
  describe("チーム名で参加者を取得できる", () => {
    test("teamIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const memberList = await new GetMemberByTeamNameQueryService(
        context,
      ).execute("1");

      expect(memberList.every((m) => m.teamID === nestedTeamData.id)).toBe(
        true,
      );
    });

    test("pairIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const memberList = await new GetMemberByTeamNameQueryService(
        context,
      ).execute("1");

      const pairIDList = nestedTeamData.pair.map((pairData) => pairData.id);

      const isAllPairIDIncluded = memberList.every((member) =>
        pairIDList.includes(member.pairID),
      );

      expect(isAllPairIDIncluded).toBe(true);
    });
  });
});
