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

  describe("重複した課題グループがあるリストは作成できない", () => {
    test("全て同じ課題グループを渡した場合", () => {
      expect(() => {
        const _exerciseGroupList = new ExerciseGroupList({
          exerciseGroupList: [
            new ExerciseGroup({ name: "テスト" }),
            new ExerciseGroup({ name: "テスト" }),
            new ExerciseGroup({ name: "テスト" }),
          ],
        });
      }).toThrowError("Dupulicate exercise group.");
    });

    test("1つだけ同じ課題グループを渡した場合", () => {
      expect(() => {
        const _exerciseGroupList = new ExerciseGroupList({
          exerciseGroupList: [
            new ExerciseGroup({ name: "テスト" }),
            new ExerciseGroup({ name: "テスト" }),
            new ExerciseGroup({ name: "データベース" }),
          ],
        });
      }).toThrowError("Dupulicate exercise group.");
    });
  });
});
