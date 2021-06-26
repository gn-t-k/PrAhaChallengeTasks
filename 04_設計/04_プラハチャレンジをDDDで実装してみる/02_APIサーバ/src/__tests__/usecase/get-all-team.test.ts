import { nestedTeamDataList } from "__tests__/__stubs__/infrastructure/db/query-service/get-all-team-query-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetAllTeamQueryService } from "infrastructure/db/query-service/get-all-team-query-service";
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
