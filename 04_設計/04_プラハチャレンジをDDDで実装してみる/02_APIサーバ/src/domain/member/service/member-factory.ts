import {
  ActivityStatus,
  activityStatusValue,
} from "../value-object/activity-status";
import { Member } from "domain/member/entity/member";

interface IProps {
  name: string;
  email: string;
}

export class MemberFactory {
  public static execute(props: IProps): Member {
    const { name, email } = props;
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    });

    return Member.create({ name, email, activityStatus });
  }
}
