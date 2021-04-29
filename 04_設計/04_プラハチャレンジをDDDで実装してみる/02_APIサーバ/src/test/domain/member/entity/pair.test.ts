import {
  Member,
  IExercise, // TODO: 後で課題オブジェクトに入れ替える
} from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Pair } from "domain/member/entity/pair";

describe("pair", () => {
  describe("ペアを作成できる", () => {
    // TODO: ダミーのpropsをmember.testからexportして使う
    const id = "123";
    const name = "a";
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
    const member1 = new Member(
      "taroid",
      "taro",
      "taro@mail.com",
      new ActivityStatus("在籍中"),
      exerciseList,
    );
    const member2 = new Member(
      "jiroid",
      "jiro",
      "jiro@mail.com",
      new ActivityStatus("在籍中"),
      exerciseList,
    );
    const memberList = [member1, member2];
    const pair = new Pair(id, name, memberList);

    test("name", () => {
      expect(pair.name).toEqual(name);
    });
    // TODO: コンストラクタの定義
    /**
     * - [ ] ペア名
     *   - [ ] アルファベット1文字のみ
     *   - [ ] 重複可（他チームにも同じ名前のペアがいるため）
     * - [ ] ペアに所属している参加者
     *   - [ ] 他のペアと重複不可
     *     - 他のペアの情報をもつ必要がある
     *     - ファーストクラスコレクション？
     *   - [ ] 2名以上3名以下
     *   - [ ] 分割、合併の処理
     */
  });
});
