import { Member } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { allMemberDataList } from "test/stub/infra/db/query-service/get-all-member-query-service";
import { RegisterMember } from "usecase/register-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("RegisterMember", () => {
  describe("参加者を登録できる", () => {
    test("重複する参加者がいなかった場合", async () => {
      const [name, email] = ["name", "test@email.com"];
      const memberData = {
        id: "test",
        name,
        email,
        activityStatus: "在籍中",
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      mockContext.prisma.member.create.mockResolvedValue(memberData);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const repository = new MemberRepository(context);
      const registerMember = new RegisterMember(repository);
      jest.spyOn(repository, "register");

      await registerMember.execute({
        name,
        email,
      });

      expect(repository.register).toHaveBeenCalledWith(
        Member.rebuild(new Identifier(expect.any(String)), {
          name,
          email,
          activityStatus: ActivityStatus.create({ status: "在籍中" }),
        }),
      );
    });
    test("idが重複する参加者がいた場合");
    test("emailが重複する参加者がいた場合");
  });
});
