import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetMemberByTeamNameQueryService } from "infra/db/query-service/get-member-by-team-name-query-service";
import {
  memberDataList,
  memberOnPairDataList,
  pairDataList,
  teamData,
} from "test/stub/infra/db/query-service/get-member-by-team-name-query-service";
import { GetMemberByTeamName } from "usecase/get-member-by-team-name";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByTeamName", () => {
  test("チーム名で参加者を取得できる", async () => {
    mockContext.prisma.team.findUnique.mockResolvedValue(teamData);
    mockContext.prisma.pair.findMany.mockResolvedValue(pairDataList);
    mockContext.prisma.memberOnPair.findMany.mockResolvedValue(
      memberOnPairDataList,
    );
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
