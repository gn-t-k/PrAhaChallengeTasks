import {
  allMemberDataList,
  nestedTeamDataList,
} from "__tests__/__stubs__/infrastructure/db/query-service/get-all-member-query-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetAllMemberQueryService } from "infrastructure/db/query-service/get-all-member-query-service";
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
      const getAllMemberSpy = jest.spyOn(getAllMemberQueryService, "execute");
      const _result = await new GetAllMember(
        getAllMemberQueryService,
      ).execute();

      expect(getAllMemberSpy).toHaveBeenCalled();
    });
  });
});
