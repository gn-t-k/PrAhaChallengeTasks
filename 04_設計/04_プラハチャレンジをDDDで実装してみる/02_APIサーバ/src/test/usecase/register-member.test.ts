import { Member } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { ExerciseRepository } from "infra/db/repository/exercise-repository";
import { MemberRepository } from "infra/db/repository/member-repository";
import { ProgressRepository } from "infra/db/repository/progress-repository";
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
      // TODO: exerciseとかexerciseOnMemberとかのモック

      const memberRepository = new MemberRepository(context);
      const exerciseRepository = new ExerciseRepository(context);
      const progressRepository = new ProgressRepository(context);
      const registerMember = new RegisterMember({
        memberRepository,
        exerciseRepository,
        progressRepository,
      });
      jest.spyOn(memberRepository, "register");

      await registerMember.execute({
        name,
        email,
      });

      expect(memberRepository.register).toHaveBeenCalledWith(
        Member.rebuild(new Identifier(expect.any(String)), {
          name,
          email,
          activityStatus: ActivityStatus.create({ status: "在籍中" }),
        }),
      );
    });

    test("emailが重複する参加者がいた場合", async () => {
      const [name, email] = ["name", "Pamela69@gmail.com"];
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
      // TODO: exerciseとかexerciseOnMemberとかのモック

      const memberRepository = new MemberRepository(context);
      const exerciseRepository = new ExerciseRepository(context);
      const progressRepository = new ProgressRepository(context);
      const registerMember = new RegisterMember({
        memberRepository,
        exerciseRepository,
        progressRepository,
      });

      const promise = registerMember.execute({
        name,
        email,
      });

      await expect(promise).rejects.toThrowError("Member already exists");
    });
  });
});
