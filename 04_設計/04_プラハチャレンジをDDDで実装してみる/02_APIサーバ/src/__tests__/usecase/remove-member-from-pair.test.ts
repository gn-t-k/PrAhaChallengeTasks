import {
  expectedTeam,
  team,
} from "__tests__/__stubs__/usecase/remove-member-from-pair";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { TeamRepository } from "infrastructure/db/repository/team-repository";
import { RemoveMemberFromPair } from "usecase/remove-member-from-pair";

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
    const removeMemberFromPair = new RemoveMemberFromPair(teamRepository);
    const [memberID, pairID] = [
      "9d553bbf-1840-49bf-8d4a-9c9deb39b31e",
      "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
    ];
    const teamRepositoryUpdateSpy = jest.spyOn(teamRepository, "update");

    await removeMemberFromPair.execute({ memberID, pairID });

    // TODO: ダサいので代替手段考える
    expect(JSON.stringify(teamRepositoryUpdateSpy.mock.calls[0][0])).toEqual(
      JSON.stringify(expectedTeam),
    );
  });
});
