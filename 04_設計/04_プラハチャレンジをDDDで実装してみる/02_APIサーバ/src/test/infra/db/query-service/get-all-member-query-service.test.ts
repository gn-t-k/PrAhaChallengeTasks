import { MockContext, Context, createMockContext } from "infra/db/context";
import { GetAllMemberQueryService } from "infra/db/query-service/get-all-member-query-service";
import {
  allMemberDataList,
  nestedTeamDataList,
} from "test/stub/infra/db/query-service/get-all-member-query-service";
import {
  MemberDTO,
  PairDTO,
  TeamDTO,
} from "usecase/query-service-interface/domain-dtos";

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
      const teamIDList = teamStructure.teamList.map((team) => team.id);

      expect(isEqualValueArray(stubTeamIDList, teamIDList)).toBe(true);
    });

    test("あるteamに所属しているpairのidが一致している", async () => {
      mockContext.prisma.team.findMany.mockResolvedValue(nestedTeamDataList);
      mockContext.prisma.member.findMany.mockResolvedValue(allMemberDataList);

      const teamStructure = await new GetAllMemberQueryService(
        context,
      ).execute();
      const anID = teamStructure.teamList[0].id;

      const stubPairIDList = nestedTeamDataList
        .find((team) => team.id === anID)
        ?.pair.map((pair) => pair.id);
      const pairIDList = teamStructure.teamList
        .find((team) => team.id === anID)
        ?.pairList.map((pair) => pair.id);

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
        (member) => member.id,
      );
      const memberBelongingToPairIDList = teamStructure.teamList
        .reduce(
          (pairList: PairDTO[], team: TeamDTO) =>
            pairList.concat(team.pairList),
          [],
        )
        .reduce(
          (memberList: MemberDTO[], pair: PairDTO) =>
            memberList.concat(pair.memberList),
          [],
        )
        .map((member) => member.id);

      expect(
        independentMemberIDList?.every(
          (id) => !memberBelongingToPairIDList.includes(id),
        ),
      ).toBe(true);
    });
  });
});
