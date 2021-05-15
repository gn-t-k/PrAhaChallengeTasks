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

  describe("他の課題グループと比較できる", () => {
    test("同じ課題グループの場合", () => {
      const name = "設計";
      const exerciseGroup1 = new ExerciseGroup({ name });
      const exerciseGroup2 = new ExerciseGroup({ name });

      expect(exerciseGroup1.equals(exerciseGroup2)).toBe(true);
    });

    test("異なる課題グループの場合", () => {
      const exerciseGroup1 = new ExerciseGroup({ name: "設計" });
      const exerciseGroup2 = new ExerciseGroup({ name: "テスト" });

      expect(exerciseGroup1.equals(exerciseGroup2)).toBe(false);
    });
  });
});
