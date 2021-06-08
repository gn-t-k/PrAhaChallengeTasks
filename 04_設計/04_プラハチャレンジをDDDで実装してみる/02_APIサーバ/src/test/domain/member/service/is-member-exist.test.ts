import { Member } from "domain/member/entity/member";
import { IsMemberExist } from "domain/member/service/is-member-exist";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { allMemberDataList } from "test/stub/infra/db/query-service/get-all-member-query-service";
import { makeDummyMember } from "test/util/dummy/member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("IsMemberExist", () => {
  test("重複する参加者がいなかった場合", async () => {
    const member = makeDummyMember();
    mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

    const repository = new MemberRepository(context);
    const isMemberExist = new IsMemberExist(repository);

    const isExistPromise = isMemberExist.execute(member);

    await expect(isExistPromise).resolves.toBe(false);
  });

  test("emailが重複する参加者がいた場合", async () => {
    const [name, email] = ["name", "Pamela69@gmail.com"];
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    });
    const member = Member.rebuild(
      new Identifier("e6744e62-0f74-4b13-bcb3-d09cb20fe551"),
      { name, email, activityStatus },
    );
    mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

    const repository = new MemberRepository(context);
    const isMemberExist = new IsMemberExist(repository);

    const isExistPromise = isMemberExist.execute(member);

    await expect(isExistPromise).resolves.toBe(true);
  });
});
