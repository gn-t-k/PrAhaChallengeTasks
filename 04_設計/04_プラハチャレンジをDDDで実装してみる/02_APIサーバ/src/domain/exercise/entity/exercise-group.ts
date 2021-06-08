import { Entity } from "domain/shared/entity";
import { Identifier } from "domain/shared/identifier";

export interface IExerciseGroup {
  name: string;
}

export class ExerciseGroup extends Entity<IExerciseGroup> {
  public get name(): string {
    return this.props.name;
  }

  public static create = (props: IExerciseGroup): ExerciseGroup => {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }

    return new ExerciseGroup(props);
  };

  public static rebuild = (
    id: Identifier,
    props: IExerciseGroup,
  ): ExerciseGroup => {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }

    return new ExerciseGroup(props, id);
  };

  public equals = (exerciseGroup: ExerciseGroup): boolean =>
    exerciseGroup.id.equals(this.id);
}
