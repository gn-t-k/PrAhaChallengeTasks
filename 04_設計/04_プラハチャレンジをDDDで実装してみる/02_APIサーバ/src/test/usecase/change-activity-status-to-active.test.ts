import { ChangeActivityStatusService } from "domain/member/service/change-activity-status-service";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { TeamRepository } from "infra/db/repository/team-repository";
import {
  activeMemberData,
  inRecessMemberData,
} from "test/stub/use-case/change-activity-status-to-active";
import { ChangeActivityStatusToActive } from "usecase/change-activity-status-to-active";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("ChangeActivityStatusToActive", () => {
  test("参加者の在籍ステータスを「在籍中」に変更できる", async () => {
    mockContext.prisma.member.findUnique.mockResolvedValue(inRecessMemberData);
    mockContext.prisma.memberOnPair.findMany.mockResolvedValue([]);

    const teamRepository = new TeamRepository(context);
    const memberRepository = new MemberRepository(context);
    const changeActivityStatusService = new ChangeActivityStatusService(
      memberRepository,
      teamRepository,
    );
    const executeSpy = jest.spyOn(changeActivityStatusService, "execute");
    const instance = new ChangeActivityStatusToActive(
      memberRepository,
      changeActivityStatusService,
    );

    await instance.execute(inRecessMemberData.id);

    // TODO: toBeCalledWithしたかったが、引数が正しいかどうかを比較するうまい手段が思いつかなかった、、
    expect(executeSpy).toBeCalled();
  });

  test("すでに在籍中の参加者を変更しようとするとエラーになる", async () => {
    mockContext.prisma.member.findUnique.mockResolvedValue(activeMemberData);

    const teamRepository = new TeamRepository(context);
    const memberRepository = new MemberRepository(context);
    const changeActivityStatusService = new ChangeActivityStatusService(
      memberRepository,
      teamRepository,
    );
    const instance = new ChangeActivityStatusToActive(
      memberRepository,
      changeActivityStatusService,
    );

    const promise = instance.execute(activeMemberData.id);

    await expect(promise).rejects.toThrowError(
      "Member's activity status is already 「在籍中」",
    );
  });
});
