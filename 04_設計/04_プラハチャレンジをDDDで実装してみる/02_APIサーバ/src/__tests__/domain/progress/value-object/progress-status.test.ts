import {
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
} from "__tests__/__utils__/dummy/progress-status";
import { ProgressStatus } from "domain/progress/value-object/progress-status";

describe("ProgressStatus", () => {
  test('進捗ステータスの初期値は"未着手"', () => {
    expect(ProgressStatus.create().value).toEqual("未着手");
  });

  describe("進捗ステータスオブジェクトを作成できる", () => {
    test("レビュー待ちの進捗ステータスオブジェクトを作成できる", () => {
      const status = "レビュー待ち";
      const progressStatus = ProgressStatus.rebuild({ status });

      expect(progressStatus.value).toEqual(status);
    });

    test("既定の文字列以外のステータスは受け付けない", () => {
      const status = "ハマチ";

      expect(() => {
        const _progressStatus = ProgressStatus.rebuild({ status });
      }).toThrowError("Invalid status value");
    });
  });

  describe("ステータスを進捗させることができる", () => {
    test('"未着手"の次は"レビュー待ち"', () => {
      const progressStatus = makeProgressStatusNotStartedYet();

      expect(progressStatus.getNext().value).toEqual("レビュー待ち");
    });

    test('"レビュー待ち"の次は"完了"', () => {
      const progressStatus = makeProgressStatusWaitingForReview();

      expect(progressStatus.getNext().value).toEqual("完了");
    });

    test('"完了"から進捗させようとするとエラーになる', () => {
      const progressStatus = makeProgressStatusDone();

      expect(() => {
        progressStatus.getNext();
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("ステータスを戻すことができる", () => {
    test('"完了"から"レビュー待ち"に戻すことができる', () => {
      const progressStatus = makeProgressStatusDone();

      expect(progressStatus.getPrevious().value).toEqual("レビュー待ち");
    });

    test('"レビュー待ち"から"未着手"に戻すことができる', () => {
      const progressStatus = makeProgressStatusWaitingForReview();

      expect(progressStatus.getPrevious().value).toEqual("未着手");
    });

    test('"未着手"から戻そうとするとエラーになる', () => {
      const progressStatus = makeProgressStatusNotStartedYet();

      expect(() => {
        progressStatus.getPrevious();
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("進捗ステータスが完了状態になっているかどうかがわかる", () => {
    test("完了している場合", () => {
      const isCompleted = makeProgressStatusDone().isDone();

      expect(isCompleted).toBe(true);
    });

    describe("完了していない場合", () => {
      test('"未着手"の場合', () => {
        const isCompleted = makeProgressStatusNotStartedYet().isDone();

        expect(isCompleted).toBe(false);
      });

      test('"レビュー待ち"の場合', () => {
        const isCompleted = makeProgressStatusWaitingForReview().isDone();

        expect(isCompleted).toBe(false);
      });
    });
  });

  describe("進捗ステータスが比較できる", () => {
    test("同じ進捗ステータスの場合", () => {
      const progressStatus1 = makeProgressStatusNotStartedYet();
      const progressStatus2 = makeProgressStatusNotStartedYet();

      expect(progressStatus1.equals(progressStatus2)).toBe(true);
    });

    test("異なる進捗ステータスの場合", () => {
      const progressStatus1 = makeProgressStatusNotStartedYet();
      const progressStatus2 = makeProgressStatusWaitingForReview();

      expect(progressStatus1.equals(progressStatus2)).toBe(false);
    });
  });
});
