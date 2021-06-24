import { MemberFactory } from "domain/member/service/member-factory";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
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
    const instance = new ChangeActivityStatusToActive(
      memberRepository,
      teamRepository,
    );

    const memberRepositoryUpdateSpy = jest.spyOn(memberRepository, "update");
    const { id, name, email } = inRecessMemberData;
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    }).value;
    const expectedArgument = MemberFactory.execute({
      id,
      name,
      email,
      activityStatus,
    });

    await instance.execute(inRecessMemberData.id);

    // 同じ内容の別のインスタンスの比較になるため、コケる、、、
    expect(memberRepositoryUpdateSpy).toBeCalledWith(expectedArgument);
  });

  test("すでに在籍中の参加者を変更しようとするとエラーになる", async () => {
    mockContext.prisma.member.findUnique.mockResolvedValue(activeMemberData);

    const teamRepository = new TeamRepository(context);
    const memberRepository = new MemberRepository(context);
    const instance = new ChangeActivityStatusToActive(
      memberRepository,
      teamRepository,
    );

    const promise = instance.execute(activeMemberData.id);

    await expect(promise).rejects.toThrowError(
      "Member's activity status is already 「在籍中」",
    );
  });
});
