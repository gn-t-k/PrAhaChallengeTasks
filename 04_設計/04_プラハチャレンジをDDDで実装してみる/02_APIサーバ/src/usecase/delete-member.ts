import { IMemberRepository } from "domain/member/member-repository-interface";
import { DeleteMemberService } from "domain/member/service/delete-member-service";
import { Identifier } from "domain/__shared__/identifier";

export class DeleteMember {
  private readonly memberRepository: IMemberRepository;
  private readonly deleteMemberService: DeleteMemberService;

  public constructor(
    memberRepository: IMemberRepository,
    deleteMemberService: DeleteMemberService,
  ) {
    this.memberRepository = memberRepository;
    this.deleteMemberService = deleteMemberService;
  }

  public execute = async (memberID: string): Promise<void> => {
    const member = await this.memberRepository.getByID(
      new Identifier(memberID),
    );

    if (member === null) {
      throw new Error("Member is not exists");
    }

    await this.deleteMemberService.execute(member);
  };
}
