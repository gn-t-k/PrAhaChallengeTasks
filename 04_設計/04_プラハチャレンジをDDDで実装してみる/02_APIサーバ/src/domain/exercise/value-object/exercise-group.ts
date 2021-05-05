export interface IExerciseGroup {
  name: string;
}

export class ExerciseGroup {
  private props: IExerciseGroup;

  constructor(props: IExerciseGroup) {
    if (props.name === "") {
      throw new Error("Illegal name value.");
    }

    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }
}
