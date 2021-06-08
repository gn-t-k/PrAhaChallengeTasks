import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllTeamQueryService } from "infra/db/query-service/get-all-team-query-service";
import { nestedTeamDataList } from "test/stub/infra/db/query-service/get-all-team-query-service";
import { GetAllTeam } from "usecase/get-all-team";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllTeam", () => {
  test("すべてのチームが取得できる", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);

    const getAllTeamQueryService = new GetAllTeamQueryService(context);
    const getAllTeamSpy = jest.spyOn(getAllTeamQueryService, "execute");
    const _result = await new GetAllTeam(getAllTeamQueryService).execute();

    expect(getAllTeamSpy).toHaveBeenCalled();
  });
});
