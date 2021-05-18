import { ValueObject } from "domain/shared/value-object";

export interface IExerciseGroup {
  name: string;
}

export class ExerciseGroup extends ValueObject<IExerciseGroup> {
  public get name(): string {
    return this.props.name;
  }

  public static create(props: IExerciseGroup): ExerciseGroup {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }

    return new ExerciseGroup(props);
  }

  public equals(exerciseGroup: ExerciseGroup): boolean {
    return this.props.name === exerciseGroup.name;
  }
}
