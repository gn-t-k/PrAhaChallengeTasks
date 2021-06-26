import { IMemberRepository } from "domain/member/member-repository-interface";
import { ChangeActivityStatusService } from "domain/member/service/change-activity-status-service";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/__shared__/identifier";

export abstract class ChangeActivityStatus {
  private readonly memberRepository: IMemberRepository;
  private readonly chageActivityStatusService: ChangeActivityStatusService;
  private readonly activityStatus: ActivityStatus;

  public constructor(
    memberRepository: IMemberRepository,
    chageActivityStatusService: ChangeActivityStatusService,
    activityStatus: ActivityStatus,
  ) {
    this.memberRepository = memberRepository;
    this.chageActivityStatusService = chageActivityStatusService;
    this.activityStatus = activityStatus;
  }

  public execute = async (memberID: string): Promise<void> => {
    const member = await this.memberRepository.getByID(
      new Identifier(memberID),
    );

    if (member === null) {
      throw new Error("Member is not exists");
    }

    await this.chageActivityStatusService.execute(member, this.activityStatus);
  };
}
