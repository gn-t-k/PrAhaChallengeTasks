import {
  Member,
  IExercise, // TODO: 後で課題オブジェクトに入れ替える
} from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { ActivityStatusList } from "domain/member/value-object/activity-status-list";

describe("Member", () => {
  const id = "123";
  const name = "tarou";
  const email = "tarou@mail.com";
  const activityStatusActive = new ActivityStatus("在籍中");
  const activityStatusInRecess = new ActivityStatus("休会中");
  const activityStatusLeft = new ActivityStatus("退会済");
  const activityStatusList = new ActivityStatusList(
    [activityStatusActive, activityStatusInRecess, activityStatusLeft],
    0,
  );
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
  const makeMember = (): Member =>
    new Member(id, name, email, activityStatusList, exerciseList);

  describe("Memberを作成できる", () => {
    const member = makeMember();

    test("name", () => {
      expect(member.name).toEqual(name);
    });

    test("email", () => {
      expect(member.email).toEqual(email);
    });

    test("status", () => {
      expect(member.status.value).toEqual("在籍中");
    });

    test("exercise", () => {
      const expectedExerciseList = exerciseList;

      expect(member.exerciseList).toEqual(expectedExerciseList);
    });
  });

  describe("Memberの名前を変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedName = "jiro";
      member.changeName(expectedName);

      expect(member.changeName(expectedName).name).toEqual(expectedName);
    });
  });

  describe("Memberのメールアドレスを変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedEmail = "jiro@mail.com";

      expect(member.changeEmail(expectedEmail).email).toEqual(expectedEmail);
    });
  });

  describe("Memberの在籍ステータスを変更できる", () => {
    const member = makeMember();

    test("changeActivityStatus", () => {
      expect(
        member.changeActivityStatus(activityStatusInRecess).status,
      ).toEqual(activityStatusInRecess);
    });
  });
});
