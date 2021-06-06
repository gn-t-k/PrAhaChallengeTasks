import { Exercise } from "domain/exercise/entity/exercise";

export interface IExerciseRepository {
  getAll(): Promise<Exercise[]>;
}
