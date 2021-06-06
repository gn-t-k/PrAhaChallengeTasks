import { Exercise } from "domain/exercise/entity/exercise";
import { Member } from "domain/member/entity/member";
import { Progress } from "domain/progress/entity/progress";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { ProgressStatus } from "domain/progress/value-object/progress-status";

export class ProgressService {
  private readonly repository: IProgressRepository;

  constructor(repository: IProgressRepository) {
    this.repository = repository;
  }

  public async isExist(member: Member): Promise<boolean> {
    const progressList = await this.repository.getAll();

    return progressList.some((progress) => progress.memberID.equals(member.id));
  }

  public static factory(member: Member, exerciseList: Exercise[]): Progress[] {
    return exerciseList.map((exercise) => {
      const memberID = member.id;
      const exerciseID = exercise.id;
      const status = ProgressStatus.create();

      return Progress.create({ memberID, exerciseID, status });
    });
  }
}
