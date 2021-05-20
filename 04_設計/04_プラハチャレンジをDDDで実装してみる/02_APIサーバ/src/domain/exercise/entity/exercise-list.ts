import { ProgressStatus } from "../value-object/progress-status";
import { Exercise } from "./exercise";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

interface IExerciseList {
  exerciseList: Exercise[];
}
export class ExerciseList extends AggregateRoot<IExerciseList> {
  public static create(props: IExerciseList): ExerciseList {
    return new ExerciseList(props);
  }

  public static rebuild(id: Identifier, props: IExerciseList): ExerciseList {
    return new ExerciseList(props, id);
  }

  public getAll(): Exercise[] {
    return this.props.exerciseList;
  }

  public getByProgressStatus(progressStatus: ProgressStatus): Exercise[] {
    return this.props.exerciseList.filter((exercise) =>
      exercise.status.equals(progressStatus),
    );
  }
}
