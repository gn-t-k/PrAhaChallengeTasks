import { DeleteMemberService } from "domain/member/service/delete-member-service";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { TeamRepository } from "infra/db/repository/team-repository";
import { memberData } from "test/stub/use-case/delete-member";
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
