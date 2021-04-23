import { ActivityStatus } from "domain/member/value-object/activity-status";
import { ActivityStatusList } from "domain/member/entity/actibity-status-list";

describe("ActivityStatusList", () => {
  describe("在籍ステータスリストが作成できる", () => {
    const activityStatusActive = new ActivityStatus("在籍中");
    const activityStatusInRecess = new ActivityStatus("休会中");
    const activityStatusLeft = new ActivityStatus("退会済");

    test("デフォルト値をインデックスで指定できる", () => {
      const activityStatusList = new ActivityStatusList(
        [activityStatusActive, activityStatusInRecess, activityStatusLeft],
        0,
      );

      expect(
        activityStatusList.currentStatus.equals(activityStatusActive),
      ).toBe(true);
    });

    // TODO: 不正なインデックス値
    // TODO: 重複した在籍ステータス
  });
});
