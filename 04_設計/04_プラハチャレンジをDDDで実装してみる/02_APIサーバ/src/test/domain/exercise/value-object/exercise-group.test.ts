import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";

describe("ExerciseGroup", () => {
  describe("課題グループを作成できる", () => {
    const name = "設計";
    const exerciseGroup = new ExerciseGroup({ name });

    test("name", () => {
      expect(exerciseGroup.name).toEqual(name);
    });
  });

  describe("バリデーション", () => {
    test("nameに空文字を設定するとエラーが返ってくる", () => {
      expect(() => {
        const _exerciseGroup = new ExerciseGroup({ name: "" });
      }).toThrowError("Illegal name value.");
    });
  });
});
