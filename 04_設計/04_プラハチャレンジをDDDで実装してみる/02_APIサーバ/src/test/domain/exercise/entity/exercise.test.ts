import { Exercise } from "domain/exercise/entity/exercise";
import { makeDummyExerciseProps } from "test/util/dummy/exercise";
import {
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
} from "test/util/dummy/progress-status";

describe("Exercise", () => {
  const { id, title, details, status, group } = makeDummyExerciseProps();
  const makeExercise = () =>
    new Exercise({ id, title, details, status, group });

  describe("Exerciseを作成できる", () => {
    const exercise = makeExercise();

    test("title", () => {
      expect(exercise.title).toEqual(title);
    });

    test("details", () => {
      expect(exercise.details).toEqual(details);
    });

    test("status", () => {
      expect(exercise.status).toEqual(status);
    });

    test("group", () => {
      expect(exercise.group).toEqual(group);
    });
  });

  describe("バリデーション", () => {
    test("titleを空文字にするとエラーが返ってくる", () => {
      expect(() => {
        const _exercise = new Exercise({
          id,
          title: "",
          details,
          status,
          group,
        });
      }).toThrowError("Illegal title value.");
    });

    test("detailsを空文字にするとエラーが返ってくる", () => {
      expect(() => {
        const _exercise = new Exercise({
          id,
          title,
          details: "",
          status,
          group,
        });
      }).toThrowError("Illegal details value.");
    });
  });

  describe("変更メソッド", () => {
    describe("進捗ステータスが変更できる", () => {
      describe("progressStatus", () => {
        const exercise = makeExercise();
        test('"未着手"から"レビュー待ち"', () => {
          expect(exercise.changeStatusNext().status.value).toEqual(
            "レビュー待ち",
          );
        });

        test('"レビュー待ち"から"完了"', () => {
          expect(exercise.changeStatusNext().status.value).toEqual("完了");
        });

        test('"完了"からは進捗できない', () => {
          expect(() => {
            exercise.changeStatusNext();
          }).toThrowError("Illegal status manipulation");
        });
      });

      describe("regressStatus", () => {
        test('"レビュー待ち"から"未着手"', () => {
          const exercise = new Exercise({
            id,
            title,
            details,
            status: makeProgressStatusWaitingForReview(),
            group,
          });

          expect(exercise.changeStatusPrevious().status.value).toEqual(
            "未着手",
          );
        });

        test('"完了"から"レビュー待ち"には戻せない', () => {
          const exercise = new Exercise({
            id,
            title,
            details,
            status: makeProgressStatusDone(),
            group,
          });

          expect(() => {
            exercise.changeStatusPrevious();
          }).toThrowError("Illegal status manipulation");
        });
      });
    });
  });
});
