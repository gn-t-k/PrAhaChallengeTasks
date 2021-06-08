import { Member } from "domain/member/entity/member";
import { IProgressRepository } from "domain/progress/progress-repository-interface";

export class IsProgressExist {
  private readonly repository: IProgressRepository;

  constructor(repository: IProgressRepository) {
    this.repository = repository;
  }

  public async execute(member: Member): Promise<boolean> {
    const progressList = await this.repository.getAll();

    return progressList.some((progress) => progress.memberID.equals(member.id));
  }
}
