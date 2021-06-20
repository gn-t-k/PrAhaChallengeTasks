import { Identifier } from "domain/shared/identifier";
import { Pair } from "domain/team/entity/pair";
import { makeDummyMember } from "test/util/dummy/member";
import { makeDummyPairProps } from "test/util/dummy/pair";

describe("pair", () => {
  describe("ペアを作成できる", () => {
    const { name, memberList } = makeDummyPairProps();
    const pair = Pair.create({ name, memberList });

    test("name", () => {
      expect(pair.name).toEqual(name);
    });

    test("memberList", () => {
      expect(pair.memberList).toEqual(memberList);
    });

    describe("バリデーション", () => {
      describe("ペア名は英字1文字のみ", () => {
        test("2文字以上設定しようとした場合", () => {
          expect(() => {
            const _pair = Pair.create({ name: "ab", memberList });
          }).toThrowError(
            "Pair name can be set with one alphabetic character.",
          );
        });

        test("数字を設定しようとした場合", () => {
          expect(() => {
            const _pair = Pair.create({ name: "1", memberList });
          }).toThrowError(
            "Pair name can be set with one alphabetic character.",
          );
        });
      });

      describe("ペアに所属する参加者は2名以上3名以下", () => {
        test("1人しか所属しないペアを作ろうとした場合", () => {
          expect(() => {
            const _pair = Pair.create({
              name,
              memberList: [makeDummyMember()],
            });
          }).toThrowError("2 or more and 3 or less member belong to pair.");
        });

        test("4人所属するペアを作ろうとした場合", () => {
          expect(() => {
            const _pair = Pair.create({
              name,
              memberList: [
                makeDummyMember(),
                makeDummyMember(),
                makeDummyMember(),
                makeDummyMember(),
              ],
            });
          }).toThrowError("2 or more and 3 or less member belong to pair.");
        });
      });
    });
  });

  describe("オブジェクトを再構築できる", () => {
    const id = new Identifier();
    const { name, memberList } = makeDummyPairProps();
    const pair = Pair.rebuild(id, { name, memberList });

    test("name", () => {
      expect(pair.name).toEqual(name);
    });

    test("memberList", () => {
      expect(pair.memberList).toEqual(memberList);
    });

    describe("バリデーション", () => {
      describe("ペア名は英字1文字のみ", () => {
        test("2文字以上設定しようとした場合", () => {
          expect(() => {
            const _pair = Pair.rebuild(id, { name: "ab", memberList });
          }).toThrowError(
            "Pair name can be set with one alphabetic character.",
          );
        });

        test("数字を設定しようとした場合", () => {
          expect(() => {
            const _pair = Pair.rebuild(id, { name: "1", memberList });
          }).toThrowError(
            "Pair name can be set with one alphabetic character.",
          );
        });
      });

      describe("ペアに所属する参加者は2名以上3名以下", () => {
        test("1人しか所属しないペアを作ろうとした場合", () => {
          expect(() => {
            const _pair = Pair.rebuild(id, {
              name,
              memberList: [makeDummyMember()],
            });
          }).toThrowError("2 or more and 3 or less member belong to pair.");
        });

        test("4人所属するペアを作ろうとした場合", () => {
          expect(() => {
            const _pair = Pair.rebuild(id, {
              name,
              memberList: [
                makeDummyMember(),
                makeDummyMember(),
                makeDummyMember(),
                makeDummyMember(),
              ],
            });
          }).toThrowError("2 or more and 3 or less member belong to pair.");
        });
      });
    });
  });

  describe("idで比較できる", () => {
    test("idが同じ時", () => {
      const id = new Identifier();
      const pair1 = Pair.rebuild(id, makeDummyPairProps());
      const pair2 = Pair.rebuild(id, makeDummyPairProps());

      expect(pair1.equals(pair2)).toBe(true);
    });

    test("idが異なる時", () => {
      const pair1 = Pair.create(makeDummyPairProps());
      const pair2 = Pair.create(makeDummyPairProps());

      expect(pair1.equals(pair2)).toBe(false);
    });
  });

  describe("参加者を追加できる", () => {
    test("追加した参加者がmemberListに含まれている", () => {
      const { name, memberList } = makeDummyPairProps();
      const pair = Pair.create({ name, memberList });
      const addedMember = makeDummyMember();
      pair.addMember(addedMember);

      const isMemberAdded = memberList
        .concat(addedMember)
        .every((member) => pair.memberList.some((m) => m.equals(member)));

      expect(isMemberAdded).toBe(true);
    });

    test("ペアに所属する参加者が4人以上になる場合、エラーになる", () => {
      const pair = Pair.create({
        name: "a",
        memberList: [makeDummyMember(), makeDummyMember(), makeDummyMember()],
      });

      expect(() => {
        pair.addMember(makeDummyMember());
      }).toThrowError("2 or more and 3 or less member belong to pair.");
    });
  });
});
