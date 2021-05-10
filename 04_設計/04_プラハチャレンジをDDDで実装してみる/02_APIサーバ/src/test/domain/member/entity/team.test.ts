import { Team } from "domain/member/entity/team";
import { makeDummyMember } from "test/util/dummy/member";
import { makeDummyPair } from "test/util/dummy/pair";

describe("Team", () => {
  describe("チームを作成できる", () => {
    const id = "123";
    const name = "1";
    const pairList = [
      makeDummyPair([makeDummyMember(), makeDummyMember()]),
      makeDummyPair([makeDummyMember(), makeDummyMember()]),
    ];

    const team = new Team({ id, name, pairList });

    test("name", () => {
      expect(team.name).toEqual(name);
    });

    test("pairList", () => {
      expect(team.pairList).toEqual(pairList);
    });
  });

  describe("バリデーション", () => {
    const id = "123";

    describe("数字以外のチーム名は設定できない", () => {
      test("アルファベットを設定しようとした場合", () => {
        const name = "a";
        const pairList = [
          makeDummyPair([makeDummyMember(), makeDummyMember()]),
          makeDummyPair([makeDummyMember(), makeDummyMember()]),
        ];

        expect(() => {
          const _team = new Team({ id, name, pairList });
        }).toThrowError("Team name can be set with numeric character.");
      });
    });

    describe("参加者数は3名以上", () => {
      test("合計の人数が2名以下のペアでチームを作成しようとした場合", () => {
        const name = "1";
        const pairList = [
          makeDummyPair([makeDummyMember(), makeDummyMember()]),
        ];

        expect(() => {
          const _team = new Team({ id, name, pairList });
        }).toThrowError("Team requires 3 or more members");
      });
    });
  });
});
