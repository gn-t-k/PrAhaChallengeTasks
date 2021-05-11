import { Member, IMember } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Exercise } from "domain/exercise/entity/exercise";
import faker from "faker";
import { makeDummyExercise } from "./exercise";

export const makeDummyMemberProps = (): IMember => {
  const id = faker.lorem.slug();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const activityStatus = new ActivityStatus({ status: "在籍中" });
  const exerciseList: Exercise[] = [makeDummyExercise(), makeDummyExercise()];

  return { id, name, email, activityStatus, exerciseList };
};

export const makeDummyMember = (): Member => {
  const {
    id,
    name,
    email,
    activityStatus,
    exerciseList,
  } = makeDummyMemberProps();

  return new Member({ id, name, email, activityStatus, exerciseList });
};
