import { Exercise } from "domain/exercise/entity/exercise";
import { ExerciseList } from "domain/exercise/entity/exercise-list";
import { Identifier } from "domain/shared/identifier";
import { makeDummyExerciseProps } from "test/util/dummy/exercise";
import {
  makeProgressStatusDone,
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
} from "test/util/dummy/progress-status";

describe("ExerciseList", () => {
  describe("課題リストが作成できる", () => {
    const [exercise1, exercise2, exercise3] = [
      Exercise.create(makeDummyExerciseProps()),
      Exercise.create(makeDummyExerciseProps()),
      Exercise.create(makeDummyExerciseProps()),
    ];
    describe("create", () => {
      const exerciseList = ExerciseList.create({
        exerciseList: [exercise1, exercise2, exercise3],
      });

      test("getAll", () => {
        expect(
          exerciseList
            .getAll()
            .every((exercise) =>
              [exercise1, exercise2, exercise3].some((e) => e.equals(exercise)),
            ),
        ).toBe(true);
      });
    });

    describe("rebuild", () => {
      test("equals", () => {
        const id = new Identifier();
        const exerciseList1 = ExerciseList.rebuild(id, {
          exerciseList: [exercise1, exercise2],
        });
        const exerciseList2 = ExerciseList.rebuild(id, {
          exerciseList: [exercise2, exercise3],
        });

        expect(exerciseList1.equals(exerciseList2)).toBe(true);
      });
    });
  });

  describe("進捗ステータスで課題を取得できる", () => {
    const { details, group } = makeDummyExerciseProps();
    const [notStartedYet, waitingForReview, done] = [
      makeProgressStatusNotStartedYet(),
      makeProgressStatusWaitingForReview(),
      makeProgressStatusDone(),
    ];
    const [exercise1, exercise2, exercise3, exercise4, exercise5, exercise6] = [
      Exercise.create({ title: "1", details, status: notStartedYet, group }),
      Exercise.create({ title: "2", details, status: notStartedYet, group }),
      Exercise.create({ title: "3", details, status: waitingForReview, group }),
      Exercise.create({ title: "4", details, status: waitingForReview, group }),
      Exercise.create({ title: "5", details, status: done, group }),
      Exercise.create({ title: "6", details, status: done, group }),
    ];
    const exerciseList = ExerciseList.create({
      exerciseList: [
        exercise1,
        exercise2,
        exercise3,
        exercise4,
        exercise5,
        exercise6,
      ],
    });

    test("未着手", () => {
      expect(
        exerciseList
          .getByProgressStatus(notStartedYet)
          .map((exercise) => exercise.title),
      ).toEqual(["1", "2"]);
    });
  });
});
