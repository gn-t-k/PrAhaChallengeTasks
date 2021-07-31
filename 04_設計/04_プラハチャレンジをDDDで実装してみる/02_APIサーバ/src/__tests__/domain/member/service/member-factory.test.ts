import { MemberFactory } from "domain/member/service/member-factory";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";

describe("MemberFactory", () => {
  test("参加者オブジェクトを生成できる", () => {
    const [name, email] = ["test", "test@test.com"];
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    });
    const member = MemberFactory.execute({ name, email });
    const isPropertyEqual =
      member.name === name &&
      member.email === email &&
      member.status.equals(activityStatus);

    // TODO: idの比較もしたい
    expect(isPropertyEqual).toBe(true);
  });
});
