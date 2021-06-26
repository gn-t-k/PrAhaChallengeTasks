import { nestedTeamDataList } from "__tests__/__stubs__/infrastructure/db/query-service/get-all-team-query-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetAllTeamQueryService } from "infrastructure/db/query-service/get-all-team-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllTeamQueryService", () => {
  test("すべてのチームが取得できている", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);

    const teamList = await new GetAllTeamQueryService(context).execute();

    const expectedTeamIDList = nestedTeamDataList.map((t) => t.id);
    const actualTeamIDList = teamList.map((t) => t.id);

    const isSameLength = expectedTeamIDList.length === actualTeamIDList.length;
    const isAllIDIncluded = actualTeamIDList.every((actualTeamID) =>
      expectedTeamIDList.includes(actualTeamID),
    );

    expect(isSameLength && isAllIDIncluded).toBe(true);
  });

  test("pairIDが適切に設定されている", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);

    const teamList = await new GetAllTeamQueryService(context).execute();

    const targetTeamID = nestedTeamDataList[0].id;
    const targetPairID = nestedTeamDataList[0].pair[0].id;

    const isAnPairIDIncluded = teamList
      .find((t) => t.id === targetTeamID)
      ?.pairIDList.some((p) => p === targetPairID);

    expect(isAnPairIDIncluded).toBe(true);
  });
});
