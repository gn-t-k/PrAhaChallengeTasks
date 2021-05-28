import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllMemberQueryService } from "infra/db/query-service/get-all-member-query-service";
import {
  allMemberDataList,
  nestedTeamDataList,
} from "test/stub/infra/db/query-service/get-all-member-query-service";
import { GetAllMember } from "usecase/get-all-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllMember", () => {
  describe("すべてのチーム（とチームに所属するペア・参加者）と、どのチーム・ペアにも所属していない参加者が取得できる", () => {
    test("teamRepository.getAll()から値を取得する", async () => {
      mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const getAllMemberQueryService = new GetAllMemberQueryService(context);
      const getAllMemberSpy = jest.spyOn(
        GetAllMemberQueryService.prototype,
        "execute",
      );
      const _result = await new GetAllMember(
        getAllMemberQueryService,
      ).execute();

      expect(getAllMemberSpy).toHaveBeenCalled();
    });
  });
});
