import { Progress } from "domain/progress/entity/progress";
import { Identifier } from "domain/shared/identifier";
import {
  makeProgressStatusDone,
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
} from "test/util/dummy/progress-status";

describe("progress", () => {
  const memberID = new Identifier();
  const exerciseID = new Identifier();
  const status = makeProgressStatusNotStartedYet();
  describe("新規に課題進捗オブジェクトを作成できる", () => {
    const progress = Progress.create({
      memberID,
      exerciseID,
      status,
    });

    test("参加者のidを取得できる", () => {
      expect(progress.memberID.equals(memberID)).toBe(true);
    });

    test("課題のIDを取得できる", () => {
      expect(progress.exerciseID.equals(exerciseID)).toBe(true);
    });

    test("進捗ステータスが取得できる", () => {
      expect(progress.status.equals(status)).toBe(true);
    });
  });

  describe("課題進捗オブジェクトを再構築できる", () => {
    const id = new Identifier();
    const progress1 = Progress.rebuild(id, {
      memberID: new Identifier(),
      exerciseID: new Identifier(),
      status,
    });
    const progress2 = Progress.rebuild(id, {
      memberID: new Identifier(),
      exerciseID: new Identifier(),
      status,
    });

    test("idで比較できる", () => {
      expect(progress1.equals(progress2)).toBe(true);
    });
  });

  describe("課題進捗を進めることができる", () => {
    test('"未着手"の次は"レビュー待ち"', () => {
      const progress = Progress.create({
        memberID,
        exerciseID,
        status,
      });

      expect(
        progress
          .changeStatusNext()
          .status.equals(makeProgressStatusWaitingForReview()),
      ).toBe(true);
    });

    test('"レビュー待ち"の次は"完了"', () => {
      const progress = Progress.create({
        memberID,
        exerciseID,
        status: makeProgressStatusWaitingForReview(),
      });

      expect(
        progress.changeStatusNext().status.equals(makeProgressStatusDone()),
      ).toBe(true);
    });

    test('"完了"のステータスを進めようとするとエラーになる', () => {
      expect(() => {
        const _progress = Progress.create({
          memberID,
          exerciseID,
          status: makeProgressStatusDone(),
        }).changeStatusNext();
      }).toThrowError("Illegal status manipulation");
    });
  });

  describe("課題進捗を戻すことができる", () => {
    test('"レビュー待ち"の前は"未着手"', () => {
      const progress = Progress.create({
        memberID,
        exerciseID,
        status: makeProgressStatusWaitingForReview(),
      });

      expect(
        progress
          .changeStatusPrevious()
          .status.equals(makeProgressStatusNotStartedYet()),
      ).toBe(true);
    });

    test('"完了"のステータスは戻せない', () => {
      expect(() => {
        const _progress = Progress.create({
          memberID,
          exerciseID,
          status: makeProgressStatusDone(),
        }).changeStatusPrevious();
      }).toThrowError("Done status cannot change previous");
    });

    test('"未着手"のステータスを戻そうとするとエラーになる', () => {
      expect(() => {
        const _progress = Progress.create({
          memberID,
          exerciseID,
          status: makeProgressStatusNotStartedYet(),
        }).changeStatusPrevious();
      }).toThrowError("Illegal status manipulation");
    });
  });
});
