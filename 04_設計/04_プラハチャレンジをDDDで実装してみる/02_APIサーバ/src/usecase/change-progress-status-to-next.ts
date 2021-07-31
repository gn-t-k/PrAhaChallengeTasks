import { Identifier } from "domain/__shared__/identifier";
import { IProgressRepository } from "domain/progress/progress-repository-interface";

export class ChangeProgressStatusNext {
  private readonly progressRepository: IProgressRepository;

  public constructor(progressRepository: IProgressRepository) {
    this.progressRepository = progressRepository;
  }

  public execute = async (
    memberID: string,
    exerciseID: string,
  ): Promise<void> => {
    const progress = await this.progressRepository.getOne({
      memberID: new Identifier(memberID),
      exerciseID: new Identifier(exerciseID),
    });

    await this.progressRepository.update(progress.changeStatusNext());
  };
}
