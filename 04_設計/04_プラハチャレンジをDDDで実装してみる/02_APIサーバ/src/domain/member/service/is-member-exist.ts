import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";

export class IsMemberExist {
  private readonly repository: IMemberRepository;

  public constructor(repository: IMemberRepository) {
    this.repository = repository;
  }

  public execute = async (member: Member): Promise<boolean> => {
    const memberList = await this.repository.getAll();

    return memberList.some((m) => m.equals(member) || m.email === member.email);
  };
}
