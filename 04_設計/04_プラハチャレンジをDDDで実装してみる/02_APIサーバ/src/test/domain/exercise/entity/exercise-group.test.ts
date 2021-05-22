import { ExerciseGroup } from "domain/exercise/entity/exercise-group";
import { Identifier } from "domain/shared/identifier";

describe("ExerciseGroup", () => {
  describe("課題グループを作成できる", () => {
    describe("create", () => {
      const name = "設計";
      const exerciseGroup = ExerciseGroup.create({ name });

      test("name", () => {
        expect(exerciseGroup.name).toEqual(name);
      });
    });

    describe("rebuild", () => {
      test("idで比較できる", () => {
        const id = new Identifier();
        const exerciseGroup1 = ExerciseGroup.rebuild(id, { name: "設計" });
        const exerciseGroup2 = ExerciseGroup.rebuild(id, { name: "テスト" });

        expect(exerciseGroup1.equals(exerciseGroup2)).toBe(true);
      });
    });
  });

  describe("バリデーション", () => {
    test("nameに空文字を設定するとエラーが返ってくる", () => {
      expect(() => {
        const _exerciseGroup = ExerciseGroup.create({ name: "" });
      }).toThrowError("Illegal name value.");
    });
  });
});
