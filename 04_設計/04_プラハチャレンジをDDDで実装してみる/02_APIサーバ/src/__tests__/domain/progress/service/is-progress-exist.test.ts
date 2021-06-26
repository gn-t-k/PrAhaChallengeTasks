import { progressDataList } from "__tests__/__stubs__/infrastructure/db/repository/progress-repository";
import {
  makeDummyMember,
  makeDummyMemberProps,
} from "__tests__/__utils__/dummy/member";
import { Identifier } from "domain/__shared__/identifier";
import { Member } from "domain/member/entity/member";
import { IsProgressExistService } from "domain/progress/service/is-progress-exist-service";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { ProgressRepository } from "infrastructure/db/repository/progress-repository";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("IsProgressExist", () => {
  test("重複する進捗データが無かった場合", async () => {
    mockContext.prisma.exerciseOnMember.findMany.mockResolvedValue(
      progressDataList,
    );

    const member = makeDummyMember();
    const progressRepository = new ProgressRepository(context);
    const isProgressExist = new IsProgressExistService(progressRepository);

    const isExistPromise = isProgressExist.execute(member);

    await expect(isExistPromise).resolves.toBe(false);
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
    const isProgressExist = new IsProgressExistService(progressRepository);

    const isExistPromise = isProgressExist.execute(member);

    await expect(isExistPromise).resolves.toBe(true);
  });
});
