import { ProgressStatus } from "domain/exercise/value-object/progress-status";

describe("ProgressStatus", () => {
  const progressStatus = new ProgressStatus();

  test('進捗ステータスの初期値は"未着手"', () => {
    expect(progressStatus.currentStatus).toEqual("未着手");
  });

  describe("ステータスを進捗させることができる", () => {
    const progressStatusForProgressTest = new ProgressStatus();

    test('"未着手"の次は"レビュー待ち"', () => {
      expect(
        progressStatusForProgressTest.progressStatus().currentStatus,
      ).toEqual("レビュー待ち");
    });

    test('"レビュー待ち"の次は"完了"', () => {
      expect(
        progressStatusForProgressTest.progressStatus().currentStatus,
      ).toEqual("完了");
    });

    test('"完了"からはステータスを進捗できない', () => {
      expect(() => {
        progressStatusForProgressTest.progressStatus();
      }).toThrowError("Illegal status manipulation");
    });
  });
});
