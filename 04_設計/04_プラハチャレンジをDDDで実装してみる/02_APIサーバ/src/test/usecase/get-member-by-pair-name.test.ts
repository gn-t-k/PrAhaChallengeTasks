import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetMemberByPairNameQueryService } from "infra/db/query-service/get-member-by-pair-name-query-service";
import {
  memberDataList,
  nestedTeamData,
} from "test/stub/infra/db/query-service/get-member-by-pair-name-query-service";
import { GetMemberByPairName } from "usecase/get-member-by-pair-name";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByPairName", () => {
  test("チーム名とペア名で参加者を取得できる", async () => {
    mockContext.prisma.team.findUnique.mockResolvedValue(nestedTeamData);
    mockContext.prisma.member.findMany.mockResolvedValue(memberDataList);

    const getMemberByPairNameQueryService = new GetMemberByPairNameQueryService(
      context,
    );
    const getMemberByPairNameSpy = jest.spyOn(
      getMemberByPairNameQueryService,
      "execute",
    );
    const teamName = "1";
    const pairName = "a";

    const _result = await new GetMemberByPairName(
      getMemberByPairNameQueryService,
    ).execute(teamName, pairName);

    expect(getMemberByPairNameSpy).toBeCalled();
  });
});
