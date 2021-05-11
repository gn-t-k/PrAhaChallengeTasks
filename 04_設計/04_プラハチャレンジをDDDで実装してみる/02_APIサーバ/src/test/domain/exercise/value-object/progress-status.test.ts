import { ProgressStatus } from "domain/exercise/value-object/progress-status";
import {
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
} from "test/util/dummy/progress-status";

describe("ProgressStatus", () => {
  test('進捗ステータスの初期値は"未着手"', () => {
    expect(ProgressStatus.create().value).toEqual("未着手");
  });

  describe("ステータスを進捗させることができる", () => {
    test('"未着手"の次は"レビュー待ち"', () => {
      expect(
        ProgressStatus.getNextStatus(makeProgressStatusNotStartedYet()).value,
      ).toEqual("レビュー待ち");
    });

    test('"レビュー待ち"の次は"完了"', () => {
      expect(
        ProgressStatus.getNextStatus(makeProgressStatusWaitingForReview())
          .value,
      ).toEqual("完了");
    });

    test('"完了"から進捗させようとするとエラーになる', () => {
      expect(() => {
        ProgressStatus.getNextStatus(makeProgressStatusDone());
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("ステータスを戻すことができる", () => {
    test('"完了"から"レビュー待ち"に戻すことができる', () => {
      expect(
        ProgressStatus.getPreviousStatus(makeProgressStatusDone()).value,
      ).toEqual("レビュー待ち");
    });

    test('"レビュー待ち"から"未着手"に戻すことができる', () => {
      expect(
        ProgressStatus.getPreviousStatus(makeProgressStatusWaitingForReview())
          .value,
      ).toEqual("未着手");
    });

    test('"未着手"から戻そうとするとエラーになる', () => {
      expect(() => {
        const _impossibleStatus = ProgressStatus.getPreviousStatus(
          makeProgressStatusNotStartedYet(),
        );
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("進捗ステータスが完了状態になっているかどうかがわかる", () => {
    test("完了している場合", () => {
      const isCompleted = makeProgressStatusDone().isCompleted();

      expect(isCompleted).toBe(true);
    });

    describe("完了していない場合", () => {
      test('"未着手"の場合', () => {
        const isCompleted = makeProgressStatusNotStartedYet().isCompleted();

        expect(isCompleted).toBe(false);
      });

      test('"レビュー待ち"の場合', () => {
        const isCompleted = makeProgressStatusWaitingForReview().isCompleted();

        expect(isCompleted).toBe(false);
      });
    });
  });
});
