import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";

interface IMemberFactoryProps {
  name: string;
  email: string;
}
export class MemberService {
  private readonly repository: IMemberRepository;

  constructor(repository: IMemberRepository) {
    this.repository = repository;
  }

  public async isExist(member: Member): Promise<boolean> {
    const memberList = await this.repository.getAll();

    return memberList.some((m) => m.equals(member) || m.email === member.email);
  }

  public static factory(props: IMemberFactoryProps): Member {
    const { name, email } = props;
    const activityStatus = ActivityStatus.create({
      status: activityStatusValue.active,
    });

    return Member.create({ name, email, activityStatus });
  }
}
