import { Team } from "domain/member/entity/team";
import { Identifier } from "domain/shared/identifier";
import { makeDummyPair } from "test/util/dummy/pair";
import { makeDummyTeam, makeDummyTeamProps } from "test/util/dummy/team";

describe("Team", () => {
  describe("チームを作成できる", () => {
    const name = "1";
    const { pairList } = makeDummyTeamProps();

    const team = Team.create({ name, pairList });

    test("name", () => {
      expect(team.name).toEqual(name);
    });

    test("pairList", () => {
      expect(team.pairList).toEqual(pairList);
    });
  });

  describe("バリデーション", () => {
    describe("数字以外のチーム名は設定できない", () => {
      test("アルファベットを設定しようとした場合", () => {
        const name = "a";
        const { pairList } = makeDummyTeamProps();

        expect(() => {
          const _team = Team.create({ name, pairList });
        }).toThrowError("Team name can be set with numeric character.");
      });
    });

    describe("参加者数は3名以上", () => {
      test("合計の人数が2名以下のペアでチームを作成しようとした場合", () => {
        const name = "1";
        const pairList = [makeDummyPair()];

        expect(() => {
          const _team = Team.create({ name, pairList });
        }).toThrowError("Team requires 3 or more members");
      });
    });
  });

  describe("idで比較できる", () => {
    test("idが同じとき", () => {
      const id = new Identifier();
      const team1 = Team.create(makeDummyTeamProps(), id);
      const team2 = Team.create(makeDummyTeamProps(), id);

      expect(team1.equals(team2)).toBe(true);
    });

    test("idが異なる時", () => {
      const team1 = makeDummyTeam();
      const team2 = makeDummyTeam();

      expect(team1.equals(team2)).toBe(false);
    });
  });
});
