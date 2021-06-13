import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetMemberByPairNameQueryService } from "infra/db/query-service/get-member-by-pair-name-query-service";
import {
  memberDataList,
  nestedTeamData,
} from "test/stub/infra/db/query-service/get-member-by-pair-name-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByPairNameQueryService", () => {
  describe("チーム名とペア名で参加者を取得できる", () => {
    test("teamIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const targetTeamName = nestedTeamData.name;
      const targetPairName = nestedTeamData.pair[0].name;

      const memberList = await new GetMemberByPairNameQueryService(
        context,
      ).execute(targetTeamName, targetPairName);

      const targetTeamID = nestedTeamData.id;

      expect(memberList.every((m) => m.teamID === targetTeamID)).toBe(true);
    });

    test("pairIDが正しく設定されている", async () => {
      mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
      mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

      const targetTeamName = nestedTeamData.name;
      const targetPairName = nestedTeamData.pair[0].name;

      const memberList = await new GetMemberByPairNameQueryService(
        context,
      ).execute(targetTeamName, targetPairName);

      const targetPairID = nestedTeamData.pair[0].id;

      expect(memberList.every((m) => m.pairID === targetPairID)).toBe(true);
    });
  });
});
