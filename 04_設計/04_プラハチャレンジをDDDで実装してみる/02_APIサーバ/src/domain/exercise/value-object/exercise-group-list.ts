import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";

export interface IExerciseGroupList {
  exerciseGroupList: ExerciseGroup[];
}

export class ExerciseGroupList {
  private props: IExerciseGroupList;

  constructor(props: IExerciseGroupList) {
    if (isExerciseGroupListDuplicated(props.exerciseGroupList)) {
      throw new Error("Dupulicate exercise group.");
    }

    this.props = props;
  }

  public get all(): ExerciseGroup[] {
    return this.props.exerciseGroupList;
  }
}

const isExerciseGroupListDuplicated = (
  exerciseGroupList: ExerciseGroup[],
): boolean => {
  const nameList = exerciseGroupList.map((exerciseGroup) => exerciseGroup.name);

  return new Set(nameList).size !== nameList.length;
};
