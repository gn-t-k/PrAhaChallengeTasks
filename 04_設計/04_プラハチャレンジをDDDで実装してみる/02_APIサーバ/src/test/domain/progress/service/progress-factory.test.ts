import { Member } from "domain/member/entity/member";
import { ProgressFactory } from "domain/progress/service/progress-factory";
import { Identifier } from "domain/shared/identifier";
import { makeDummyExercise } from "test/util/dummy/exercise";
import { makeDummyMemberProps } from "test/util/dummy/member";

describe("ProgressFactory", () => {
  test("課題進捗オブジェクトを生成できる", () => {
    const memberID = new Identifier();
    const { name, email, activityStatus } = makeDummyMemberProps();
    const member = Member.rebuild(memberID, {
      name,
      email,
      activityStatus,
    });

    const exerciseList = [
      makeDummyExercise(),
      makeDummyExercise(),
      makeDummyExercise(),
    ];

    const progressList = ProgressFactory.execute({ member, exerciseList });
    const isCorrectProgressList = progressList.every((progress) => {
      const isCorrectMemberID = progress.memberID === memberID;
      const isCorrectExerciseID = exerciseList
        .map((e) => e.id.value)
        .includes(progress.exerciseID.value);

      return isCorrectMemberID && isCorrectExerciseID;
    });

    expect(isCorrectProgressList).toBe(true);
  });
});
