import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";

describe("ActivityStatus", () => {
  describe("在籍ステータスを作成できる", () => {
    test("在籍ステータスを取得できる", () => {
      const status = activityStatusValue.active;
      const activityStatus = ActivityStatus.create({ status });

      expect(activityStatus.value).toEqual(status);
    });

    describe("在籍オブジェクトを比較できる", () => {
      const { active } = activityStatusValue;
      const { inRecess } = activityStatusValue;
      const activityStatusActive = ActivityStatus.create({ status: active });
      const activityStatusInRecess = ActivityStatus.create({
        status: inRecess,
      });

      test("同一の場合", () => {
        expect(activityStatusActive.equals(activityStatusActive)).toEqual(true);
      });

      test("同一でない場合", () => {
        expect(activityStatusActive.equals(activityStatusInRecess)).toEqual(
          false,
        );
      });
    });

    test("不正な文字列で在籍ステータスを作ろうとした場合、エラーが返ってくる", () => {
      expect(() => {
        const _activityStatus = ActivityStatus.create({ status: "森三中" });
      }).toThrowError("Invalid status value");
    });
  });
});
