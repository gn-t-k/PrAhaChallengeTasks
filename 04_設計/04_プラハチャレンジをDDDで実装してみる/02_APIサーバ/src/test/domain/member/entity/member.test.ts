import {
  Member,
  IExercise, // TODO: 後で課題オブジェクトに入れ替える
} from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { ActivityStatusList } from "domain/member/value-object/actibity-status-list";

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
      const memberName = member.name;

      expect(memberName).toEqual(name);
    });

    test("email", () => {
      const memberEmail = member.email;

      expect(memberEmail).toEqual(email);
    });

    test("status", () => {
      const memberStatus = member.status;

      expect(memberStatus).toEqual("在籍中");
    });

    test("exercise", () => {
      const expectedExerciseList = exerciseList;
      const memberExerciseList = member.exerciseList;

      expect(memberExerciseList).toEqual(expectedExerciseList);
    });
  });

  describe("Memberの名前を変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedName = "jiro";
      member.changeName(expectedName);

      expect(member.name).toEqual(expectedName);
    });
  });

  describe("Memberのメールアドレスを変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedEmail = "jiro@mail.com";
      member.changeEmail(expectedEmail);

      expect(member.email).toEqual(expectedEmail);
    });
  });

  describe("Memberの在籍ステータスを変更できる", () => {
    const member = makeMember();

    test("changeActivityStatus", () => {
      const expectedActivityStatus = "休会中";

      expect(
        member.changeActivityStatus(expectedActivityStatus).status,
      ).toEqual(expectedActivityStatus);
    });

    test("リストに存在しないステータスを設定しようとした場合エラーが返ってくる", () => {
      const status = "森三中";

      expect(() => {
        member.changeActivityStatus(status);
      }).toThrowError("Invalid status value.");
    });
  });
});
