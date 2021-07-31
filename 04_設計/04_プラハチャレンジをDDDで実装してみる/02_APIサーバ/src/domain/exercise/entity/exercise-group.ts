import { Entity } from "domain/__shared__/entity";
import { Identifier } from "domain/__shared__/identifier";

export interface IExerciseGroup {
  name: string;
}

export class ExerciseGroup extends Entity<IExerciseGroup> {
  public get name(): string {
    return this.props.name;
  }

  public static create = (props: IExerciseGroup): ExerciseGroup => {
    ExerciseGroup.validateName(props.name);

    return new ExerciseGroup(props);
  };

  public static rebuild = (
    id: Identifier,
    props: IExerciseGroup,
  ): ExerciseGroup => {
    ExerciseGroup.validateName(props.name);

    return new ExerciseGroup(props, id);
  };

  public equals = (exerciseGroup: ExerciseGroup): boolean =>
    exerciseGroup.id.equals(this.id);

  private static validateName = (name: string) => {
    if (name === "") {
      throw new Error("Illegal name value.");
    }
  };
}
