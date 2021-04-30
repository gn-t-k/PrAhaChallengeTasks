import { Team } from "domain/member/entity/team";
import { makeDummyMember } from "test/util/dummy/member";
import { makeDummyPair } from "test/util/dummy/pair";

describe("Team", () => {
  describe("チームを作成できる", () => {
    const id = "123";
    const name = "1";
    const pairList = [
      makeDummyPair([makeDummyMember(), makeDummyMember()]),
      makeDummyPair([makeDummyMember(), makeDummyMember()]),
    ];

    const team = new Team(id, name, pairList);

    test("name", () => {
      expect(team.name).toEqual(name);
    });
  });

  // TODO: コンストラクタの定義
  /**
   * - [ ] チーム名は数字
   * - [ ] 参加者数は3名以上
   */
});
