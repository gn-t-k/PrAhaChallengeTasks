/* eslint-disable import/no-extraneous-dependencies */
import { mocked } from "ts-jest/utils";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { MemberRepository } from "infra/db/repository/member-repository";
import { inRecessMember } from "test/stub/use-case/change-activity-status-to-active";
import { ChangeActivityStatusToActive } from "usecase/change-activity-status-to-active";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
  mocked(MemberRepository, true).mockClear();
});

jest.mock("infra/db/repository/member-repository", () => ({
  MemberRepository: jest.fn().mockImplementation(() => ({
    getByID: () => inRecessMember,
    update: () => jest.fn(),
  })),
}));

describe("ChangeActivityStatusToActive", () => {
  test("参加者の在籍ステータスを「在籍中」に変更できる", async () => {
    const memberRepository = new MemberRepository(context);
    const instance = new ChangeActivityStatusToActive(memberRepository);

    const memberRepositoryUpdateSpy = jest.spyOn(memberRepository, "update");
    const expectedMember = inRecessMember;

    await instance.execute(inRecessMember.id.value);

    expect(memberRepositoryUpdateSpy).toBeCalledWith(expectedMember);
  });
});
