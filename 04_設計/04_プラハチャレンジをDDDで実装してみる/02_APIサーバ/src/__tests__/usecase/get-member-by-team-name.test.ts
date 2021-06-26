import {
  memberDataList,
  nestedTeamData,
} from "__tests__/__stubs__/infrastructure/db/query-service/get-member-by-team-name-query-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetMemberByTeamNameQueryService } from "infrastructure/db/query-service/get-member-by-team-name-query-service";
import { GetMemberByTeamName } from "usecase/get-member-by-team-name";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByTeamName", () => {
  test("チーム名で参加者を取得できる", async () => {
    mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
    mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

    const getMemberByTeamNameQueryService = new GetMemberByTeamNameQueryService(
      context,
    );
    const getMemberByTeamNameSpy = jest.spyOn(
      getMemberByTeamNameQueryService,
      "execute",
    );
    const teamName = "1";

    const _result = await new GetMemberByTeamName(
      getMemberByTeamNameQueryService,
    ).execute(teamName);

    expect(getMemberByTeamNameSpy).toHaveBeenCalled();
  });
});
