import { ExerciseGroupList } from "domain/exercise/value-object/exercise-group-list";
import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";

describe("ExerciseGroupList", () => {
  describe("課題グループリストが作成できる", () => {
    const props = [
      new ExerciseGroup({ name: "テスト" }),
      new ExerciseGroup({ name: "データベース" }),
      new ExerciseGroup({ name: "設計" }),
    ];
    const exerciseGroupList = new ExerciseGroupList({
      exerciseGroupList: props,
    });

    test("作成したオブジェクトから正しい課題グループリストが取得できる", () => {
      expect(exerciseGroupList.all).toEqual(props);
    });
  });
});
