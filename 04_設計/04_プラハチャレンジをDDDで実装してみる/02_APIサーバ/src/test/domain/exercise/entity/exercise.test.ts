import { Exercise } from "domain/exercise/entity/exercise";
import { Identifier } from "domain/shared/identifier";
import { makeDummyExerciseProps } from "test/util/dummy/exercise";

describe("Exercise", () => {
  const { title, details, group } = makeDummyExerciseProps();

  describe("Exerciseを作成できる", () => {
    const exercise = Exercise.create({ title, details, group });

    test("title", () => {
      expect(exercise.title).toEqual(title);
    });

    test("details", () => {
      expect(exercise.details).toEqual(details);
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
            group,
          });
        }).toThrowError("Illegal title value.");
      });

      test("detailsを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.create({
            title,
            details: "",
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
      group,
    });

    test("title", () => {
      expect(exercise.title).toEqual(title);
    });

    test("details", () => {
      expect(exercise.details).toEqual(details);
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
            group,
          });
        }).toThrowError("Illegal title value.");
      });

      test("detailsを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _exercise = Exercise.rebuild(new Identifier(), {
            title,
            details: "",
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
});
