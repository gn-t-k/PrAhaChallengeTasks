import { ExerciseGroup } from "domain/exercise/entity/exercise-group";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

export interface IExercise {
  title: string;
  description: string;
  group: ExerciseGroup;
}

export class Exercise extends AggregateRoot<IExercise> {
  public get title(): string {
    return this.props.title;
  }

  public get details(): string {
    return this.props.description;
  }

  public get group(): ExerciseGroup {
    return this.props.group;
  }

  public static create(props: IExercise): Exercise {
    this.checkProps(props);

    return new Exercise(props);
  }

  public static rebuild(id: Identifier, props: IExercise): Exercise {
    this.checkProps(props);

    return new Exercise(props, id);
  }

  // TODO: 課題タイトルや課題詳細を変更するメソッドがあってもいいかもしれない

  private static checkProps(props: IExercise): void {
    if (props.title === "") {
      throw new Error("Illegal title value.");
    }
    if (props.description === "") {
      throw new Error("Illegal details value.");
    }
  }
}
