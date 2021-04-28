import { ActivityStatus } from "domain/member/value-object/activity-status";

describe("ActivityStatus", () => {
  describe("在籍ステータスを作成できる", () => {
    test("在籍ステータスを取得できる", () => {
      const status = "在籍中";
      const activityStatus = new ActivityStatus(status);

      expect(activityStatus.value).toEqual(status);
    });

    describe("在籍オブジェクトを比較できる", () => {
      const active = "在籍中";
      const inRecess = "休会中";
      const activityStatusActive = new ActivityStatus(active);
      const activityStatusInRecess = new ActivityStatus(inRecess);

      test("同一の場合", () => {
        expect(activityStatusActive.equals(activityStatusActive)).toEqual(true);
      });

      test("同一でない場合", () => {
        expect(activityStatusActive.equals(activityStatusInRecess)).toEqual(
          false,
        );
      });
    });

    describe("バリデーション", () => {
      test("空文字の在籍ステータスは作成できない", () => {
        expect(() => {
          const _activityStatus = new ActivityStatus("");
        }).toThrowError("Invalid status value.");
      });
    });
  });
});
