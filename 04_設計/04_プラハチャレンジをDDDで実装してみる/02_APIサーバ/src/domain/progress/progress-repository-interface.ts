import { Progress } from "domain/progress/entity/progress";

export interface IProgressRepository {
  register(progressList: Progress[]): Promise<void>;
  getAll(): Promise<Progress[]>;
}
