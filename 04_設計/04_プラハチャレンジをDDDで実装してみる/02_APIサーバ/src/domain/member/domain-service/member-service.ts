import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";

export class MemberService {
  private readonly repository: IMemberRepository;

  constructor(repository: IMemberRepository) {
    this.repository = repository;
  }

  public async isExist(member: Member): Promise<boolean> {
    const memberList = await this.repository.getAll();

    return memberList.some((m) => m.equals(member) || m.email === member.email);
  }
}
