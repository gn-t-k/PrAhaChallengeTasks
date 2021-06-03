import { Member } from "domain/member/entity/member";
import { MemberService } from "domain/member/member-service";
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

describe("MemberService", () => {
  describe("isExist", () => {
    test("重複する参加者がいなかった場合", async () => {
      const member = makeDummyMember();
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const repository = new MemberRepository(context);
      const memberService = new MemberService(repository);

      const isExistPromise = memberService.isExist(member);

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
      const memberService = new MemberService(repository);

      const isExistPromise = memberService.isExist(member);

      await expect(isExistPromise).resolves.toBe(true);
    });
  });

  describe("factory", () => {
    test("参加者オブジェクトを生成できる", () => {
      const [name, email] = ["test", "test@test.com"];
      const activityStatus = ActivityStatus.create({
        status: activityStatusValue.active,
      });
      const member = MemberService.factory({ name, email });
      const isPropertyEqual =
        member.name === name &&
        member.email === email &&
        member.status.equals(activityStatus);

      // TODO: idの比較もしたい
      expect(isPropertyEqual).toBe(true);
    });
  });
});
