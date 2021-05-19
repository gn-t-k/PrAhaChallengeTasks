import faker from "faker";
import { Exercise } from "domain/exercise/entity/exercise";
import { Member, IMember } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { makeDummyExercise } from "test/util/dummy/exercise";

export const makeDummyMemberProps = (): IMember => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const activityStatus = ActivityStatus.create({ status: "在籍中" });
  const exerciseList: Exercise[] = [makeDummyExercise(), makeDummyExercise()];

  return { name, email, activityStatus, exerciseList };
};

export const makeDummyMember = (): Member => {
  const { name, email, activityStatus, exerciseList } = makeDummyMemberProps();

  return Member.create({ name, email, activityStatus, exerciseList });
};
