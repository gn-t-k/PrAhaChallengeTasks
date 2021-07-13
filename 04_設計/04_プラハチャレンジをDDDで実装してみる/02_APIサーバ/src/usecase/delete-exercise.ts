import { Identifier } from "domain/__shared__/identifier";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { IsExerciseExistsService } from "domain/exercise/service/is-exercise-exists-service";
import { IProgressRepository } from "domain/progress/progress-repository-interface";

export class DeleteExercise {
  private readonly exerciseRepository: IExerciseRepository;
  private readonly progressRepository: IProgressRepository;

  public constructor(
    exerciseRepository: IExerciseRepository,
    progressRepository: IProgressRepository,
  ) {
    this.exerciseRepository = exerciseRepository;
    this.progressRepository = progressRepository;
  }

  public execute = async (id: string): Promise<void> => {
    const exerciseID = new Identifier(id);

    const isExerciseExists = await new IsExerciseExistsService(
      this.exerciseRepository,
    ).execute(exerciseID);

    if (!isExerciseExists) {
      throw new Error("Exercise is not exists");
    }

    await this.progressRepository.deleteByExerciseID(exerciseID);
    await this.exerciseRepository.deleteByID(exerciseID);
  };
}
