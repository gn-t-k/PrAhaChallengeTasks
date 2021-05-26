import { MockContext, Context, createMockContext } from "infra/db/context";
import { TeamRepository } from "infra/db/repository/team-repository";
import { GetAllTeamAndMember } from "usecase/team/get-all-team-and-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllTeamAndMember", () => {
  describe("すべてのチーム（とチームに所属するペア・参加者）と、どのチーム・ペアにも所属していない参加者が取得できる", () => {
    test("teamRepository.getAll()から値を取得する", () => {
      const teamRepository = new TeamRepository(context);
      const getAllSpy = jest.spyOn(TeamRepository.prototype, "getAll");
      const _result = new GetAllTeamAndMember(teamRepository).execute();

      expect(getAllSpy).toHaveBeenCalled();
    });
  });
});
