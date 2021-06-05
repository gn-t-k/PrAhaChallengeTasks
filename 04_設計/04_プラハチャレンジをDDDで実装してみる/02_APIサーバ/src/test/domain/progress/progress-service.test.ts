import { Member } from "domain/member/entity/member";
import { ProgressService } from "domain/progress/progress-service";
import { Identifier } from "domain/shared/identifier";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { ProgressRepository } from "infra/db/repository/progress-repository";
import { progressDataList } from "test/stub/infra/db/repository/progress-repository";
import { makeDummyMember, makeDummyMemberProps } from "test/util/dummy/member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("ProgressService", () => {
  describe("isExist", () => {
    test("重複する進捗データが無かった場合", async () => {
      mockContext.prisma.exerciseOnMember.findMany.mockResolvedValue(
        progressDataList,
      );

      const member = makeDummyMember();
      const progressRepository = new ProgressRepository(context);
      const progressService = new ProgressService(progressRepository);

      expect(await progressService.isExist(member)).toBe(false);
    });

    test("重複する進捗データがあった場合", async () => {
      mockContext.prisma.exerciseOnMember.findMany.mockResolvedValue(
        progressDataList,
      );

      const { name, email, activityStatus } = makeDummyMemberProps();
      const member = Member.rebuild(
        new Identifier("4f19e241-baaa-4e59-8ae7-63f1d52cece2"),
        {
          name,
          email,
          activityStatus,
        },
      );
      const progressRepository = new ProgressRepository(context);
      const progressService = new ProgressService(progressRepository);

      expect(await progressService.isExist(member)).toBe(true);
    });
  });
});
