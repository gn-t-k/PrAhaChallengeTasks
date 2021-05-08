import { ActivityStatus } from "domain/member/value-object/activity-status";
import { ActivityStatusList } from "domain/member/value-object/activity-status-list";

describe("ActivityStatusList", () => {
  describe("在籍ステータスリストが作成できる", () => {
    const activityStatusActive = new ActivityStatus({ status: "在籍中" });
    const activityStatusInRecess = new ActivityStatus({ status: "休会中" });
    const activityStatusLeft = new ActivityStatus({ status: "退会済" });

    describe("作成した在籍ステータスリストを取得できる", () => {
      const props = [
        activityStatusActive,
        activityStatusInRecess,
        activityStatusLeft,
      ];
      const activityStatusList = new ActivityStatusList({
        activityStatusList: props,
      });

      test("作成したオブジェクトから正しい在籍ステータスリストが取得できる", () => {
        expect(activityStatusList.all).toEqual(props);
      });
    });

    describe("重複した在籍ステータスがあるリストは作成できない", () => {
      test("全て同じ在籍ステータスを渡した場合", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList({
            activityStatusList: [
              new ActivityStatus({ status: "在籍中" }),
              new ActivityStatus({ status: "在籍中" }),
              new ActivityStatus({ status: "在籍中" }),
            ],
          });
        }).toThrowError("Duplicate status value.");
      });

      test("1つだけ同じ在籍ステータスを渡した場合", () => {
        expect(() => {
          const _activityStatusList = new ActivityStatusList({
            activityStatusList: [
              new ActivityStatus({ status: "在籍中" }),
              new ActivityStatus({ status: "在籍中" }),
              new ActivityStatus({ status: "退会済" }),
            ],
          });
        }).toThrowError("Duplicate status value.");
      });
    });
  });
});
