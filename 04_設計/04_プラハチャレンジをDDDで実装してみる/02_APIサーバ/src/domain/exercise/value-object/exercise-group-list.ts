import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";

export interface IExerciseGroupList {
  exerciseGroupList: ExerciseGroup[];
}

export class ExerciseGroupList {
  private props: IExerciseGroupList;

  constructor(props: IExerciseGroupList) {
    this.props = props;
  }

  public get all(): ExerciseGroup[] {
    return this.props.exerciseGroupList;
  }
}
