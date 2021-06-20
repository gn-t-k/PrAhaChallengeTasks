import { Member } from "domain/member/entity/member";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";

interface IProps {
  name: string;
  email: string;
  id?: string;
  activityStatus?: string;
}

export class MemberFactory {
  public static execute = (props: IProps): Member => {
    const { name, email } = props;
    const activityStatus = ActivityStatus.create({
      status: props.activityStatus ?? activityStatusValue.active,
    });

    return props.id
      ? Member.rebuild(new Identifier(props.id), {
          name,
          email,
          activityStatus,
        })
      : Member.create({ name, email, activityStatus });
  };
}
