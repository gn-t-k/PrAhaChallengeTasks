import { Member } from "domain/team/entity/member";
import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";
import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllMemberQueryService } from "infra/db/query-service/get-all-member-query-service";
import {
  allMemberDataList,
  nestedTeamDataList,
} from "test/stub/infra/db/query-service/get-all-member-query-service";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllMemberQueryService", () => {
  describe("teamList", () => {
    const isEqualValueArray = (left?: string[], right?: string[]) =>
      left !== undefined &&
      right !== undefined &&
      left.length === right.length &&
      left.every((l) => right.includes(l));

    test("teamのIDがスタブと一致している", async () => {
      mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const teamStructure = await new GetAllMemberQueryService(
        context,
      ).execute();

      const stubTeamIDList = nestedTeamDataList.map((team) => team.id);
      const teamIDList = teamStructure.teamList.map((team) => team.id.value);

      expect(isEqualValueArray(stubTeamIDList, teamIDList)).toBe(true);
    });

    test("あるteamに所属しているpairのidが一致している", async () => {
      mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const teamStructure = await new GetAllMemberQueryService(
        context,
      ).execute();
      const anID = teamStructure.teamList[0].id.value;

      const stubPairIDList = nestedTeamDataList
        .find((team) => team.id === anID)
        ?.pair.map((pair) => pair.id);
      const pairIDList = teamStructure.teamList
        .find((team) => team.id.value === anID)
        ?.pairList.map((pair) => pair.id.value);

      expect(isEqualValueArray(stubPairIDList, pairIDList)).toBe(true);
    });

    // TODO: memberが一致しているかどうかもテストしたかったが力尽きた
  });

  describe("independentMemberList", () => {
    test("independentMemberListに含まれるmemberはteamListに含まれない", async () => {
      mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const teamStructure = await new GetAllMemberQueryService(
        context,
      ).execute();
      const independentMemberIDList = teamStructure.independentMemberList?.map(
        (member) => member.id.value,
      );
      const memberBelongingToPairIDList = teamStructure.teamList
        .reduce(
          (pairList: Pair[], team: Team) => pairList.concat(team.pairList),
          [],
        )
        .reduce(
          (memberList: Member[], pair: Pair) =>
            memberList.concat(pair.memberList),
          [],
        )
        .map((member) => member.id.value);

      expect(
        independentMemberIDList?.every(
          (id) => !memberBelongingToPairIDList.includes(id),
        ),
      ).toBe(true);
    });
  });
});
