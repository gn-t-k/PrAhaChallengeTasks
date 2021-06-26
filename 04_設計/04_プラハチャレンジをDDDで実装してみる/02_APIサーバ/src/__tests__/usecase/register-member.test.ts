import { allMemberDataList } from "__tests__/__stubs__/infrastructure/db/query-service/get-all-member-query-service";
import {
  exerciseDataList,
  exerciseGroupDataList,
} from "__tests__/__stubs__/infrastructure/db/repository/exercise-repository";
import {
  batchPayload,
  progressDataList,
} from "__tests__/__stubs__/infrastructure/db/repository/progress-repository";
import { Member } from "domain/member/entity/member";
import { IsMemberExistService } from "domain/member/service/is-member-exist-service";
import { IsProgressExistService } from "domain/progress/service/is-progress-exist-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { ExerciseRepository } from "infrastructure/db/repository/exercise-repository";
import { MemberRepository } from "infrastructure/db/repository/member-repository";
import { ProgressRepository } from "infrastructure/db/repository/progress-repository";
import { RegisterMember } from "usecase/register-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("RegisterMember", () => {
  describe("参加者を登録できる", () => {
    beforeEach(() => {
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);
      mockContext.prisma.exercise.findMany.mockResolvedValue(exerciseDataList);
      mockContext.prisma.exerciseGroup.findMany.mockResolvedValue(
        exerciseGroupDataList,
      );
      mockContext.prisma.exerciseOnMember.createMany.mockResolvedValue(
        batchPayload,
      );
      mockContext.prisma.exerciseOnMember.findMany.mockResolvedValue(
        progressDataList,
      );
    });

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

      const memberRepository = new MemberRepository(context);
      const exerciseRepository = new ExerciseRepository(context);
      const progressRepository = new ProgressRepository(context);
      const isMemberExistService = new IsMemberExistService(memberRepository);
      const isProgressExistService = new IsProgressExistService(
        progressRepository,
      );
      const registerMember = new RegisterMember({
        memberRepository,
        exerciseRepository,
        progressRepository,
        isMemberExistService,
        isProgressExistService,
      });
      jest.spyOn(memberRepository, "register");

      await registerMember.execute({
        name,
        email,
      });

      expect(memberRepository.register).toHaveBeenCalledWith(
        // TODO: プロパティのテストもしたい
        expect.any(Member),
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

      const memberRepository = new MemberRepository(context);
      const exerciseRepository = new ExerciseRepository(context);
      const progressRepository = new ProgressRepository(context);
      const isMemberExistService = new IsMemberExistService(memberRepository);
      const isProgressExistService = new IsProgressExistService(
        progressRepository,
      );
      const registerMember = new RegisterMember({
        memberRepository,
        exerciseRepository,
        progressRepository,
        isMemberExistService,
        isProgressExistService,
      });

      const promise = registerMember.execute({
        name,
        email,
      });

      await expect(promise).rejects.toThrowError("Member already exists");
    });
  });
});
