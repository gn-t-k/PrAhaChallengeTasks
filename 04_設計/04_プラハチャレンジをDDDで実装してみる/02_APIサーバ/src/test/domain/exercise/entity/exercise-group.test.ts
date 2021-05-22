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
    describe("nameに空文字を設定するとエラーが返ってくる", () => {
      test("create", () => {
        expect(() => {
          const _exerciseGroup = ExerciseGroup.create({ name: "" });
        }).toThrowError("Illegal name value.");
      });

      test("rebuild", () => {
        expect(() => {
          const _exerciseGroup = ExerciseGroup.rebuild(new Identifier(), {
            name: "",
          });
        }).toThrowError("Illegal name value.");
      });
    });
  });
});
