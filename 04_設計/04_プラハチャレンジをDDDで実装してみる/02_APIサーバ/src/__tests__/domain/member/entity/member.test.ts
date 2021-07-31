import {
  makeDummyMember,
  makeDummyMemberProps,
} from "__tests__/__utils__/dummy/member";
import { Member } from "domain/member/entity/member";
import { Identifier } from "domain/__shared__/identifier";

describe("Member", () => {
  const { name, email, activityStatus } = makeDummyMemberProps();
  const makeMember = (): Member =>
    Member.create({
      name,
      email,
      activityStatus,
    });

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

    describe("バリデーション", () => {
      test("nameを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.create({
            name: "",
            email,
            activityStatus,
          });
        }).toThrowError("Illegal name value.");
      });

      test("emailを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.create({
            name,
            email: "",
            activityStatus,
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

    describe("バリデーション", () => {
      test("nameを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.rebuild(new Identifier(), {
            name: "",
            email,
            activityStatus,
          });
        }).toThrowError("Illegal name value.");
      });

      test("emailを空文字にするとエラーが返ってくる", () => {
        expect(() => {
          const _member = Member.rebuild(new Identifier(), {
            name,
            email: "",
            activityStatus,
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
});
