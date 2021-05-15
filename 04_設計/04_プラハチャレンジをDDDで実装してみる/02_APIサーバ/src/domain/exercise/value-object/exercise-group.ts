import { ValueObject } from "domain/shared/value-object";

export interface IExerciseGroup {
  name: string;
}

export class ExerciseGroup extends ValueObject<IExerciseGroup> {
  constructor(props: IExerciseGroup) {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }

    super(props);
  }

  public equals(exerciseGroup: ExerciseGroup): boolean {
    return this.props.name === exerciseGroup.name;
  }

  public get name(): string {
    return this.props.name;
  }
}
