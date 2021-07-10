import { Identifier } from "domain/__shared__/identifier";
import { Progress } from "domain/progress/entity/progress";

export interface IGetOne {
  memberID: Identifier;
  exerciseID: Identifier;
}

export interface IProgressRepository {
  register(progressList: Progress[]): Promise<void>;
  getOne(props: IGetOne): Promise<Progress>;
  getAll(): Promise<Progress[]>;
  update(progress: Progress): Promise<void>;
}
