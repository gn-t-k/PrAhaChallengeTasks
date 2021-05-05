import { Exercise } from "domain/exercise/entity/exercise";
import { makeDummyExerciseProps } from "test/util/dummy/exercise";

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
});
