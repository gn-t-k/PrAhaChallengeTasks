import { Identifier } from "domain/__shared__/identifier";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";

export class IsExerciseExistsService {
  private readonly exerciseRepository: IExerciseRepository;

  public constructor(exerciseRepository: IExerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  public execute = async (id: Identifier): Promise<boolean> =>
    (await this.exerciseRepository.getByID(id)) !== null;
}
