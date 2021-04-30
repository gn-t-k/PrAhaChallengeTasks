import {
  Member,
  IMember,
  IExercise, // TODO: 後で課題オブジェクトに入れ替える
} from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import faker from "faker";

export const makeDummyMemberProps = (): IMember => {
  const id = faker.lorem.slug();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const activityStatus = new ActivityStatus("在籍中");
  // TODO: 後で課題オブジェクトに入れ替える
  const exerciseList: IExercise[] = [
    {
      title: "課題1",
      status: "未着手",
    },
    {
      title: "課題2",
      status: "未着手",
    },
  ];

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

  return new Member(id, name, email, activityStatus, exerciseList);
};
