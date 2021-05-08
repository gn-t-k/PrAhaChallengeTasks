import { Member } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { makeDummyMemberProps } from "test/util/dummy/member";

describe("Member", () => {
  const {
    id,
    name,
    email,
    activityStatus,
    exerciseList,
  } = makeDummyMemberProps();
  const makeMember = (): Member =>
    new Member({ id, name, email, activityStatus, exerciseList });

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

  describe("バリデーション", () => {
    test("nameを空文字にするとエラーが返ってくる", () => {
      expect(() => {
        const _member = new Member({
          id,
          name: "",
          email,
          activityStatus,
          exerciseList,
        });
      }).toThrowError("Illegal name value.");
    });

    test("emailを空文字にするとエラーが返ってくる", () => {
      expect(() => {
        const _member = new Member({
          id,
          name,
          email: "",
          activityStatus,
          exerciseList,
        });
      }).toThrowError("Illegal email value.");
    });
  });

  describe("Memberの名前を変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedName = "jiro";
      member.changeName(expectedName);

      expect(member.changeName(expectedName).name).toEqual(expectedName);
    });

    test("空文字には変更できない", () => {
      expect(() => {
        member.changeName("");
      }).toThrowError("Illegal name value.");
    });
  });

  describe("Memberのメールアドレスを変更できる", () => {
    const member = makeMember();

    test("changeName", () => {
      const expectedEmail = "jiro@mail.com";

      expect(member.changeEmail(expectedEmail).email).toEqual(expectedEmail);
    });

    test("空文字には変更できない", () => {
      expect(() => {
        member.changeEmail("");
      }).toThrowError("Illegal email value.");
    });
  });

  describe("Memberの在籍ステータスを変更できる", () => {
    const activityStatusInRecess = new ActivityStatus({ status: "休会中" });
    const member = new Member({
      id,
      name,
      email,
      activityStatus: activityStatusInRecess,
      exerciseList,
    });

    test("changeActivityStatus", () => {
      expect(
        member.changeActivityStatus(activityStatusInRecess).status,
      ).toEqual(activityStatusInRecess);
    });
  });
});
