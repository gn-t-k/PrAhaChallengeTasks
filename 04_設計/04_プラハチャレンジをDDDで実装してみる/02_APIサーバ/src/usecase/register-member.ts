import { MemberService } from "domain/member/domain-service/member-service";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";

export class RegisterMember {
  private readonly repository: IMemberRepository;
  private readonly memberService: MemberService;

  constructor(repository: IMemberRepository) {
    this.repository = repository;
    this.memberService = new MemberService(repository);
  }

  public async execute(member: Member): Promise<void> {
    const isExists = await this.memberService.isExist(member);
    if (isExists) {
      throw new Error("Member already exists");
    }

    await this.repository.register(member);
  }
}
