import { ProgressStatus } from "domain/exercise/value-object/progress-status";

describe("ProgressStatus", () => {
  test('進捗ステータスの初期値は"未着手"', () => {
    expect(new ProgressStatus().currentStatus).toEqual("未着手");
  });

  describe("ステータスを進捗させることができる", () => {
    test('"未着手"の次は"レビュー待ち"', () => {
      expect(new ProgressStatus().progressStatus().currentStatus).toEqual(
        "レビュー待ち",
      );
    });

    test('"レビュー待ち"の次は"完了"', () => {
      expect(
        new ProgressStatus().progressStatus().progressStatus().currentStatus,
      ).toEqual("完了");
    });

    test('"完了"からはステータスを進捗できない', () => {
      expect(() => {
        new ProgressStatus().progressStatus().progressStatus().progressStatus();
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("ステータスを戻すことができる", () => {
    test('"レビュー待ち"から"未着手"に戻すことができる', () => {
      expect(
        new ProgressStatus().progressStatus().regressStatus().currentStatus,
      ).toEqual("未着手");
    });

    test('"未着手"から戻そうとするとエラーになる', () => {
      expect(() => {
        new ProgressStatus().regressStatus();
      }).toThrowError("Illegal status manipulation");
    });

    test('"完了"になったステータスは戻せない', () => {
      expect(() => {
        new ProgressStatus().progressStatus().progressStatus().regressStatus();
      }).toThrowError("Illegal status manipulation");
    });
  });
});
