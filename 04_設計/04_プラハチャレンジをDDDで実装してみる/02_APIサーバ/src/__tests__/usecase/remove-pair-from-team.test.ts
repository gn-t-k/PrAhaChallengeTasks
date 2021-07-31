import {
  expectedTeam,
  team,
} from "__tests__/__stubs__/usecase/remove-pair-from-team";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { TeamRepository } from "infrastructure/db/repository/team-repository";
import { RemovePairFromTeam } from "usecase/remove-pair-from-team";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

jest.mock("infrastructure/db/repository/team-repository", () => ({
  TeamRepository: jest.fn().mockImplementation(() => ({
    getByPairID: () => team,
    update: jest.fn(),
  })),
}));

describe("RemoveMemberFromPair", () => {
  test("チームリポジトリに適切なチームオブジェクトを渡して更新メソッドを実行する", async () => {
    const teamRepository = new TeamRepository(context);
    const removePairFromTeam = new RemovePairFromTeam(teamRepository);
    const pairID = "9da36d6e-c4a2-4215-bfb1-fa62acebd725";
    const teamRepositoryUpdateSpy = jest.spyOn(teamRepository, "update");

    await removePairFromTeam.execute(pairID);

    const argsPassedToSpy = teamRepositoryUpdateSpy.mock.calls[0][0];
    const allPairEquals = argsPassedToSpy.pairList.every((pair) =>
      expectedTeam.pairList.some((expectedPair) => expectedPair.equals(pair)),
    );

    expect(allPairEquals).toBe(true);
  });
});
