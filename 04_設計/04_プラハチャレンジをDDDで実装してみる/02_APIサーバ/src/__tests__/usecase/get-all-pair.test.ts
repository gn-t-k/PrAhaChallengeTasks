import {
  allMemberDataList,
  nestedTeamDataList,
} from "__tests__/__stubs__/usecase/get-all-pair";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { TeamRepository } from "infrastructure/db/repository/team-repository";
import { GetAllPair } from "usecase/get-all-pair";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllPair", () => {
  test("すべてのペアが取得できる", async () => {
    mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
    mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

    const teamRepository = new TeamRepository(context);
    const teamRepositoryGetAllSpy = jest.spyOn(teamRepository, "getAll");
    const _result = await new GetAllPair(teamRepository).execute();

    expect(teamRepositoryGetAllSpy).toHaveBeenCalled();
  });
});
