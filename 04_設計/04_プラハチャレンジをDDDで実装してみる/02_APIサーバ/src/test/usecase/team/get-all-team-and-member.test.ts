import { Member } from "domain/team/entity/member";
import { Team } from "domain/team/entity/team";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { TeamRepository } from "infra/db/repository/team-repository";
import {
  allMemberDataList,
  nestedTeamDataList,
} from "test/stub/infra/db/repository/team-repository";
import { GetAllTeamAndMember } from "usecase/team/get-all-team-and-member";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllTeamAndMember", () => {
  describe("すべてのチーム（とチームに所属するペア・参加者）と、どのチーム・ペアにも所属していない参加者が取得できる", () => {
    describe("正常終了した場合", () => {
      // TODO: いいテストケースがあれば知りたい
      test("Teamの配列が取得できる", async () => {
        mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
        mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

        const teamRepository = new TeamRepository(context);
        const { teamList } = await new GetAllTeamAndMember(
          teamRepository,
        ).execute();

        expect(teamList[0] instanceof Team).toBe(true);
      });

      test("Memberの配列が取得できる", async () => {
        mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
        mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

        const teamRepository = new TeamRepository(context);
        const { independentMemberList } = await new GetAllTeamAndMember(
          teamRepository,
        ).execute();

        expect(
          independentMemberList !== undefined &&
            independentMemberList[0] instanceof Member,
        ).toBe(true);
      });
    });

    describe("異常終了した場合", () => {
      test("例外を投げる", () => {
        const teamRepository = new TeamRepository(context);
        jest
          .spyOn(teamRepository, "getAll")
          .mockRejectedValueOnce(new Error("some error"));

        expect(async () => {
          await new GetAllTeamAndMember(teamRepository).execute();
        }).toThrowError("some error");
      });
    });
  });
});
