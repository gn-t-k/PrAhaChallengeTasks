import faker from "faker";
import { Identifier } from "domain/shared/identifier";
import { Member, IMember } from "domain/team/entity/member";
import { ActivityStatus } from "domain/team/value-object/activity-status";

export const makeDummyMemberProps = (): IMember => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const activityStatus = ActivityStatus.create({ status: "在籍中" });
  const exerciseListID = new Identifier();

  return { name, email, activityStatus, exerciseListID };
};

export const makeDummyMember = (): Member => {
  const {
    name,
    email,
    activityStatus,
    exerciseListID,
  } = makeDummyMemberProps();

  return Member.create({
    name,
    email,
    activityStatus,
    exerciseListID,
  });
};
