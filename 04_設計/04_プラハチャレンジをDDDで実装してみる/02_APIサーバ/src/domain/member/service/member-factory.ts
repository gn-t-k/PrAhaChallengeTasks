import { Member } from "domain/member/entity/member";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";

interface IProps {
  name: string;
  email: string;
}

export class MemberFactory {
  public static execute = (props: IProps): Member => {
    const { name, email } = props;
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    });

    return Member.create({ name, email, activityStatus });
  };
}
