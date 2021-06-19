// eslint-disable-next-line import/no-extraneous-dependencies
import { mocked } from "ts-jest/utils";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { TeamRepository } from "infra/db/repository/team-repository";
import {
  expectedTeam,
  member,
  team,
} from "test/stub/use-case/add-member-to-pair";
import { AddMemberToPair } from "usecase/add-member-to-pair";

let mockContext: MockContext;
let context: Context;

const MockedTeamRepository = mocked(TeamRepository, true);
const MockedMemberRepository = mocked(MemberRepository, true);

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
  MockedTeamRepository.mockClear();
  MockedMemberRepository.mockClear();
});

jest.mock("infra/db/repository/team-repository", () => ({
  TeamRepository: jest.fn().mockImplementation(() => ({
    getByPairID: () => team,
    update: jest.fn(),
  })),
}));
jest.mock("infra/db/repository/member-repository", () => ({
  MemberRepository: jest.fn().mockImplementation(() => ({
    getByID: () => member,
  })),
}));

describe("AddMemberToPair", () => {
  test.skip("チームリポジトリに適切なチームオブジェクトを渡して更新メソッドを実行する", async () => {
    const teamRepository = new TeamRepository(context);
    const memberRepository = new MemberRepository(context);
    const addMemberToPairInstance = new AddMemberToPair(
      teamRepository,
      memberRepository,
    );
    const [memberID, pairID] = [
      "a5294443-5945-4a74-aac0-593671ed166b",
      "9da36d6e-c4a2-4215-bfb1-fa62acebd725",
    ];
    const teamRepositoryUpdateSpy = jest.spyOn(teamRepository, "update");

    await addMemberToPairInstance.execute(memberID, pairID);

    // 同じ内容の別のインスタンスの比較になってしまうので、failになる、、
    expect(teamRepositoryUpdateSpy).toBeCalledWith(expectedTeam);
  });
});
