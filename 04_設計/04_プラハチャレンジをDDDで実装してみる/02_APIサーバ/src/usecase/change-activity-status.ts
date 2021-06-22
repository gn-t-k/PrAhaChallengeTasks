import { IMemberRepository } from "domain/member/member-repository-interface";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";

export abstract class ChangeActivityStatus {
  private readonly memberRepository: IMemberRepository;
  private readonly activityStatus: ActivityStatus;

  constructor(
    memberRepository: IMemberRepository,
    activityStatus: ActivityStatus,
  ) {
    this.memberRepository = memberRepository;
    this.activityStatus = activityStatus;
  }

  public execute = async (memberID: string): Promise<void> => {
    const member = await this.memberRepository.getByID(
      new Identifier(memberID),
    );

    if (member.status.equals(this.activityStatus)) {
      throw new Error(
        `Member's activity status is already 「${this.activityStatus.value}」`,
      );
    }

    member.changeActivityStatus(this.activityStatus);

    await this.memberRepository.update(member);
  };
}
