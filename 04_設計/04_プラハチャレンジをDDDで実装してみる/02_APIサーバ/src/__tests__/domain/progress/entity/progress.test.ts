import {
  makeProgressStatusDone,
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
} from "__tests__/__utils__/dummy/progress-status";
import { Progress } from "domain/progress/entity/progress";
import { Identifier } from "domain/__shared__/identifier";

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

    test("参加者のIDを取得できる", () => {
      expect(progress.memberID.equals(memberID)).toBe(true);
    });

    test("課題のIDを取得できる", () => {
      expect(progress.exerciseID.equals(exerciseID)).toBe(true);
    });

    test("進捗ステータスが取得できる", () => {
      expect(progress.status.equals(status)).toBe(true);
    });

    describe("参加者のIDと課題のIDで比較できる", () => {
      const id1 = new Identifier();
      const id2 = new Identifier();

      test("参加者IDと課題IDの両方が一致する場合", () => {
        const progress1 = Progress.create({
          memberID: id1,
          exerciseID: id2,
          status,
        });
        const progress2 = Progress.create({
          memberID: id1,
          exerciseID: id2,
          status,
        });

        expect(progress1.equals(progress2)).toBe(true);
      });

      test("参加者IDと課題IDの片方が一致しない場合", () => {
        const progress1 = Progress.create({
          memberID: id1,
          exerciseID: id2,
          status,
        });
        const progress2 = Progress.create({
          memberID: id1,
          exerciseID: id1,
          status,
        });

        expect(progress1.equals(progress2)).toBe(false);
      });

      test("参加者IDと課題IDの両方とも一致しない場合", () => {
        const progress1 = Progress.create({
          memberID: id1,
          exerciseID: id1,
          status,
        });
        const progress2 = Progress.create({
          memberID: id2,
          exerciseID: id2,
          status,
        });

        expect(progress1.equals(progress2)).toBe(false);
      });
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
