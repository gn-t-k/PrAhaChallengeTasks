import { Member } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { makeDummyMember, makeDummyMemberProps } from "test/util/dummy/member";

describe("Member", () => {
  const { name, email, activityStatus, exerciseList } = makeDummyMemberProps();
  const makeMember = (): Member =>
    Member.create({ name, email, activityStatus, exerciseList });

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

    describe("バリデーション", () => {
      test("nameを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.create({
            name: "",
            email,
            activityStatus,
            exerciseList,
          });
        }).toThrowError("Illegal name value.");
      });

      test("emailを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.create({
            name,
            email: "",
            activityStatus,
            exerciseList,
          });
        }).toThrowError("Illegal email value.");
      });
    });
  });

  describe("オブジェクトを再構築できる", () => {
    const member = Member.rebuild(new Identifier(), {
      name,
      email,
      activityStatus,
      exerciseList,
    });

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

    describe("バリデーション", () => {
      test("nameを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.rebuild(new Identifier(), {
            name: "",
            email,
            activityStatus,
            exerciseList,
          });
        }).toThrowError("Illegal name value.");
      });

      test("emailを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.rebuild(new Identifier(), {
            name,
            email: "",
            activityStatus,
            exerciseList,
          });
        }).toThrowError("Illegal email value.");
      });
    });
  });

  describe("idで比較できる", () => {
    test("idが同じとき", () => {
      const id = new Identifier();
      const member1 = Member.rebuild(id, makeDummyMemberProps());
      const member2 = Member.rebuild(id, makeDummyMemberProps());

      expect(member1.equals(member2)).toBe(true);
    });

    test("idが異なるとき", () => {
      const member1 = makeDummyMember();
      const member2 = makeDummyMember();

      expect(member1.equals(member2)).toBe(false);
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
    const activityStatusInRecess = ActivityStatus.create({ status: "休会中" });
    const member = Member.create({
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
