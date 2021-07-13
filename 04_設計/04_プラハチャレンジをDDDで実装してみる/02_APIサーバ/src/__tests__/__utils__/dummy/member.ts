import faker from "faker";
import { Member, IMember } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";

export const makeDummyMemberProps = (): IMember => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const activityStatus = ActivityStatus.create({ status: "在籍中" });

  return { name, email, activityStatus };
};

export const makeDummyMember = (): Member => {
  const { name, email, activityStatus } = makeDummyMemberProps();

  return Member.create({
    name,
    email,
    activityStatus,
  });
};
