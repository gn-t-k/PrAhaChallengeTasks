import { Progress } from "domain/progress/entity/progress";

export interface IProgressRepository {
  register(exerciseList: Progress[]): Promise<void>;
  getAll(): Promise<Progress[]>;
}
