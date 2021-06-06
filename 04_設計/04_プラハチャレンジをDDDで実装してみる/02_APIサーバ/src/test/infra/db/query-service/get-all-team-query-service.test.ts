import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllTeamQueryService } from "infra/db/query-service/get-all-team-query-service";
import { nestedTeamDataList } from "test/stub/infra/db/query-service/get-all-team-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllTeamQueryService", () => {
  test("すべてのチームが取得できる", async () => {
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
