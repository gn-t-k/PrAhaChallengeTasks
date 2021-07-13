import {
  mockExerciseDataList,
  mockMemberDataList,
} from "__tests__/__stubs__/infrastructure/db/query-service/get-member-by-exercise-and-progress-query-service";
import { Member } from "domain/member/entity/member";
import { MemberFactory } from "domain/member/service/member-factory";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetMemberByExerciseAndProgressQueryService } from "infrastructure/db/query-service/get-member-by-exercise-and-progress-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetMemberByExerciseAndProgressQueryService", () => {
  describe("特定の課題が特定の進捗ステータスに鳴っている参加者の一覧を10人単位でページングして取得できる", () => {
    test("DTOの形に整形して返す", async () => {
      mockContext.prisma.member.findMany.mockResolvedValue(mockMemberDataList);
      mockContext.prisma.exercise.findMany.mockResolvedValue(
        mockExerciseDataList,
      );
      const instance = new GetMemberByExerciseAndProgressQueryService(context);

      const exerciseIDList = ["0c38b747-891d-4ecf-8d95-55b29a9c75b8"];
      const progressStatus = "レビュー待ち";
      const take = 10;
      const page = 1;

      const memberDataList = await instance.execute(
        exerciseIDList,
        progressStatus,
        take,
        page,
      );

      const actualMemberList = memberDataList.map((memberData) =>
        MemberFactory.execute({
          id: memberData.id,
          name: memberData.name,
          email: memberData.email,
          activityStatus: memberData.activityStatus,
        }),
      );
      const expectedMemberList = [
        MemberFactory.execute({
          id: "10c54873-6408-4b7d-8328-3e245cac981f",
          name: "Dallas Balistreri",
          email: "Hassan_Schumm@gmail.com",
          activityStatus: "在籍中",
        }),
      ];

      const isSameMemberList = (memberListA: Member[], memberListB: Member[]) =>
        memberListA.length === memberListB.length &&
        memberListA.every((memberA) =>
          memberListB.some(
            (memberB) =>
              memberA.id.equals(memberB.id) &&
              memberA.name === memberB.name &&
              memberA.email === memberB.email &&
              memberA.status.equals(memberB.status),
          ),
        );

      expect(isSameMemberList(actualMemberList, expectedMemberList)).toBe(true);
    });
  });
});
