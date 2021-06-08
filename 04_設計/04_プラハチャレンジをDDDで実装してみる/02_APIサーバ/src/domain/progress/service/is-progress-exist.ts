import { Member } from "domain/member/entity/member";
import { IProgressRepository } from "domain/progress/progress-repository-interface";

export class IsProgressExist {
  private readonly repository: IProgressRepository;

  public constructor(repository: IProgressRepository) {
    this.repository = repository;
  }

  public execute = async (member: Member): Promise<boolean> => {
    const progressList = await this.repository.getAll();

    return progressList.some((progress) => progress.memberID.equals(member.id));
  };
}
