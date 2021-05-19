import { Exercise } from "domain/exercise/entity/exercise";
import { Identifier } from "domain/shared/identifier";
import { makeDummyExerciseProps } from "test/util/dummy/exercise";
import {
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
} from "test/util/dummy/progress-status";

describe("Exercise", () => {
  const { title, details, status, group } = makeDummyExerciseProps();

  describe("Exerciseを作成できる", () => {
    const exercise = Exercise.create({ title, details, status, group });

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

    describe("バリデーション", () => {
      test("titleを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.create({
            title: "",
            details,
            status,
            group,
          });
        }).toThrowError("Illegal title value.");
      });

      test("detailsを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.create({
            title,
            details: "",
            status,
            group,
          });
        }).toThrowError("Illegal details value.");
      });
    });
  });

  describe("オブジェクトを再構築できる", () => {
    const exercise = Exercise.rebuild(new Identifier(), {
      title,
      details,
      status,
      group,
    });

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

    describe("バリデーション", () => {
      test("titleを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.rebuild(new Identifier(), {
            title: "",
            details,
            status,
            group,
          });
        }).toThrowError("Illegal title value.");
      });

      test("detailsを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.rebuild(new Identifier(), {
            title,
            details: "",
            status,
            group,
          });
        }).toThrowError("Illegal details value.");
      });
    });
  });

  describe("idで比較できる", () => {
    test("idが同じ時", () => {
      const id = new Identifier();
      const exercise1 = Exercise.rebuild(id, makeDummyExerciseProps());
      const exercise2 = Exercise.rebuild(id, makeDummyExerciseProps());

      expect(exercise1.equals(exercise2)).toBe(true);
    });

    test("idが異なるとき", () => {
      const exercise1 = Exercise.create(makeDummyExerciseProps());
      const exercise2 = Exercise.create(makeDummyExerciseProps());

      expect(exercise1.equals(exercise2)).toBe(false);
    });
  });

  describe("変更メソッド", () => {
    describe("進捗ステータスが変更できる", () => {
      describe("changeStatusNext", () => {
        const exercise = Exercise.create({ title, details, status, group });
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

      describe("changeStatusPrevious", () => {
        test('"レビュー待ち"から"未着手"', () => {
          const exercise = Exercise.create({
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
          const exercise = Exercise.create({
            title,
            details,
            status: makeProgressStatusDone(),
            group,
          });

          expect(() => {
            exercise.changeStatusPrevious();
          }).toThrowError("Completed exercise cannnot be changed");
        });
      });
    });
  });
});
