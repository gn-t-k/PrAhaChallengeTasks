import { memberData } from "__tests__/__stubs__/usecase/delete-member";
import { DeleteMemberService } from "domain/member/service/delete-member-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { MemberRepository } from "infrastructure/db/repository/member-repository";
import { TeamRepository } from "infrastructure/db/repository/team-repository";
import { DeleteMember } from "usecase/delete-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("DeleteMember", () => {
  test("参加者を削除する", async () => {
    mockContext.prisma.member.findUnique.mockResolvedValue(memberData);
    mockContext.prisma.memberOnPair.findMany.mockResolvedValue([]);

    const memberRepository = new MemberRepository(context);
    const teamRepository = new TeamRepository(context);
    const deleteMemberService = new DeleteMemberService(
      memberRepository,
      teamRepository,
    );
    const executeSpy = jest.spyOn(deleteMemberService, "execute");
    const instance = new DeleteMember(memberRepository, deleteMemberService);

    await instance.execute(memberData.id);

    expect(executeSpy).toBeCalled();
  });
});
