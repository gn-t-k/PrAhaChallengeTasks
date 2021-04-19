import {
  Member,
  IExercise, // TODO: 後で課題オブジェクトに入れ替える
} from "domain/member/entity/member";

describe("Member", () => {
  describe("Memberを作成できる", () => {
    const id = "123";
    const name = "tarou";
    const email = "tarou@mail.com";
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
    const member = new Member(id, name, email, exerciseList);

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
});
