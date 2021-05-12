import { makeDummyMember } from "test/util/dummy/member";
import { Pair } from "domain/member/entity/pair";

describe("pair", () => {
  describe("ペアを作成できる", () => {
    const name = "a";
    const memberList = [makeDummyMember(), makeDummyMember()];
    const pair = new Pair({ name, memberList });

    test("name", () => {
      expect(pair.name).toEqual(name);
    });

    test("memberList", () => {
      expect(pair.memberList).toEqual(memberList);
    });
  });

  describe("バリデーション", () => {
    describe("ペア名は英字1文字のみ", () => {
      const memberList = [makeDummyMember(), makeDummyMember()];

      test("2文字以上設定しようとした場合", () => {
        const name = "ab";

        expect(() => {
          const _pair = new Pair({ name, memberList });
        }).toThrowError("Pair name can be set with one alphabetic character.");
      });

      test("数字を設定しようとした場合", () => {
        const name = "1";

        expect(() => {
          const _pair = new Pair({ name, memberList });
        }).toThrowError("Pair name can be set with one alphabetic character.");
      });
    });

    describe("ペアに所属する参加者は2名以上3名以下", () => {
      const name = "a";

      test("1人しか所属しないペアを作ろうとした場合", () => {
        const memberList = [makeDummyMember()];

        expect(() => {
          const _pair = new Pair({ name, memberList });
        }).toThrowError("2 or more and 3 or less member belong to pair.");
      });

      test("4人所属するペアを作ろうとした場合", () => {
        const memberList = [
          makeDummyMember(),
          makeDummyMember(),
          makeDummyMember(),
          makeDummyMember(),
        ];

        expect(() => {
          const _pair = new Pair({ name, memberList });
        }).toThrowError("2 or more and 3 or less member belong to pair.");
      });
    });
  });
});
