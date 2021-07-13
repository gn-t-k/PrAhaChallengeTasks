import { Identifier } from "domain/__shared__/identifier";
import { Exercise } from "domain/exercise/entity/exercise";

export interface IExerciseRepository {
  getByID(id: Identifier): Promise<Exercise | null>;
  getAll(): Promise<Exercise[]>;
  register(exercise: Exercise): Promise<void>;
  deleteByID(id: Identifier): Promise<void>;
}
