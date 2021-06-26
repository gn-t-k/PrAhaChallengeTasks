import { makeDummyMember } from "__tests__/__utils__/dummy/member";
import { makeDummyPair } from "__tests__/__utils__/dummy/pair";
import {
  makeDummyTeam,
  makeDummyTeamProps,
} from "__tests__/__utils__/dummy/team";
import { Identifier } from "domain/__shared__/identifier";
import { PairFactory } from "domain/team/domain-service/pair-factory";
import { TeamFactory } from "domain/team/domain-service/team-factory";
import { Team } from "domain/team/entity/team";

describe("Team", () => {
  describe("チームを作成できる", () => {
    const { name, pairList } = makeDummyTeamProps();
    const team = Team.create({ name, pairList });

    test("name", () => {
      expect(team.name).toEqual(name);
    });

    test("pairList", () => {
      expect(team.pairList).toEqual(pairList);
    });

    describe("バリデーション", () => {
      describe("数字以外のチーム名は設定できない", () => {
        test("アルファベットを設定しようとした場合", () => {
          expect(() => {
            const _team = Team.create({ name: "a", pairList });
          }).toThrowError("Team name can be set with numeric character.");
        });
      });

      describe("参加者数は3名以上", () => {
        test("合計の人数が2名以下のペアでチームを作成しようとした場合", () => {
          expect(() => {
            const _team = Team.create({ name, pairList: [makeDummyPair()] });
          }).toThrowError("Team requires 3 or more members");
        });
      });
    });
  });

  describe("オブジェクトを再構築できる", () => {
    const id = new Identifier();
    const { name, pairList } = makeDummyTeamProps();
    const team = Team.rebuild(id, { name, pairList });

    test("name", () => {
      expect(team.name).toEqual(name);
    });

    test("pairList", () => {
      expect(team.pairList).toEqual(pairList);
    });

    describe("バリデーション", () => {
      describe("数字以外のチーム名は設定できない", () => {
        test("アルファベットを設定しようとした場合", () => {
          expect(() => {
            const _team = Team.rebuild(id, { name: "a", pairList });
          }).toThrowError("Team name can be set with numeric character.");
        });
      });

      describe("参加者数は3名以上", () => {
        test("合計の人数が2名以下のペアでチームを作成しようとした場合", () => {
          expect(() => {
            const _team = Team.rebuild(id, {
              name,
              pairList: [makeDummyPair()],
            });
          }).toThrowError("Team requires 3 or more members");
        });
      });
    });
  });

  describe("idで比較できる", () => {
    test("idが同じとき", () => {
      const id = new Identifier();
      const team1 = Team.rebuild(id, makeDummyTeamProps());
      const team2 = Team.rebuild(id, makeDummyTeamProps());

      expect(team1.equals(team2)).toBe(true);
    });

    test("idが異なる時", () => {
      const team1 = makeDummyTeam();
      const team2 = makeDummyTeam();

      expect(team1.equals(team2)).toBe(false);
    });
  });

  test("参加者一覧が取得できる", () => {
    const memberList = [
      makeDummyMember(),
      makeDummyMember(),
      makeDummyMember(),
      makeDummyMember(),
    ];
    const pairList = [
      PairFactory.execute({
        id: "testID1",
        name: "a",
        memberList: [memberList[0], memberList[1]],
      }),
      PairFactory.execute({
        id: "testID2",
        name: "b",
        memberList: [memberList[2], memberList[3]],
      }),
    ];
    const team = TeamFactory.execute({
      id: "testID3",
      name: "1",
      pairList,
    });

    const isAllMemberExists =
      team.getMemberList().length === memberList.length &&
      team
        .getMemberList()
        .every((member) => memberList.some((m) => m.equals(member)));

    expect(isAllMemberExists).toBe(true);
  });

  test("ペアを更新できる", () => {
    const team = makeDummyTeam();
    const newPairList = [makeDummyPair(), makeDummyPair()];
    team.updatePairList(newPairList);

    const isPairListReplaced = team.pairList.every((pair) =>
      newPairList.some((p) => p.equals(pair)),
    );

    expect(isPairListReplaced).toBe(true);
  });
});
