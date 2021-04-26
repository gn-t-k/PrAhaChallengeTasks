import { ActivityStatus } from "domain/member/value-object/activity-status";
import { ActivityStatusList } from "domain/member/value-object/activity-status-list";

describe("ActivityStatusList", () => {
  describe("在籍ステータスリストが作成できる", () => {
    const activityStatusActive = new ActivityStatus("在籍中");
    const activityStatusInRecess = new ActivityStatus("休会中");
    const activityStatusLeft = new ActivityStatus("退会済");

    describe("作成した在籍ステータスリストを取得できる", () => {
      const props = [
        activityStatusActive,
        activityStatusInRecess,
        activityStatusLeft,
      ];
      const activityStatusList = new ActivityStatusList(props, 0);

      test("作成時に渡した在籍ステータスがすべてリストに含まれている", () => {
        expect(
          props.every((activityStatus) =>
            activityStatusList.all.includes(activityStatus),
          ),
        );
      });

      test("作成時に渡した在籍ステータスと作成したリストが持つステータスの数が等しい", () => {
        expect(activityStatusList.all.length).toEqual(props.length);
      });
    });

    test("デフォルト値をインデックスで指定できる", () => {
      const activityStatusList = new ActivityStatusList(
        [activityStatusActive, activityStatusInRecess, activityStatusLeft],
        0,
      );

      expect(
        activityStatusList.currentStatus.equals(activityStatusActive),
      ).toBe(true);
    });

    describe("不正なインデックス値を値した場合エラーになる", () => {
      test("リストよりも大きなインデックス値", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList(
            [activityStatusActive, activityStatusInRecess, activityStatusLeft],
            4,
          );
        }).toThrowError("Illegal index value.");
      });

      test("負のインデックス値", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList(
            [activityStatusActive, activityStatusInRecess, activityStatusLeft],
            -1,
          );
        }).toThrowError("Illegal index value.");
      });
    });

    describe("重複した在籍ステータスがあるリストは作成できない", () => {
      test("全て同じ在籍ステータスを渡した場合", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList(
            [activityStatusActive, activityStatusActive, activityStatusActive],
            0,
          );
        }).toThrowError("Duplicate status value.");
      });

      test("1つだけ同じ在籍ステータスを渡した場合", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList(
            [activityStatusActive, activityStatusActive, activityStatusLeft],
            0,
          );
        }).toThrowError("Duplicate status value.");
      });
    });
  });
});
