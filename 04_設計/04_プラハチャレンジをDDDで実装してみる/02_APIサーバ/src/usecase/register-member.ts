import { MemberService } from "domain/member/domain-service/member-service";
import { IMemberRepository } from "domain/member/member-repository-interface";

export interface IRegisterMemberProps {
  name: string;
  email: string;
}

export class RegisterMember {
  private readonly repository: IMemberRepository;
  private readonly memberService: MemberService;

  constructor(repository: IMemberRepository) {
    this.repository = repository;
    this.memberService = new MemberService(repository);
  }

  public async execute(props: IRegisterMemberProps): Promise<void> {
    const { name, email } = props;
    const member = MemberService.factory({ name, email });
    const isExist = await this.memberService.isExist(member);

    if (isExist) {
      throw new Error("Member already exists");
    }

    await this.repository.register(member);
  }
}
