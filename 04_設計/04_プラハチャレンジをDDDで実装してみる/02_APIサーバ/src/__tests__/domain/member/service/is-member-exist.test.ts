import { allMemberDataList } from "__tests__/__stubs__/infrastructure/db/query-service/get-all-member-query-service";
import { makeDummyMember } from "__tests__/__utils__/dummy/member";
import { Identifier } from "domain/__shared__/identifier";
import { Member } from "domain/member/entity/member";
import { IsMemberExistService } from "domain/member/service/is-member-exist-service";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { MemberRepository } from "infrastructure/db/repository/member-repository";

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
    const isMemberExist = new IsMemberExistService(repository);

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
    const isMemberExist = new IsMemberExistService(repository);

    const isExistPromise = isMemberExist.execute(member);

    await expect(isExistPromise).resolves.toBe(true);
  });
});
