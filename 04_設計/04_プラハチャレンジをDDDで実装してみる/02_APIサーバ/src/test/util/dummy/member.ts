import faker from "faker";
import { Member, IMember } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";

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
