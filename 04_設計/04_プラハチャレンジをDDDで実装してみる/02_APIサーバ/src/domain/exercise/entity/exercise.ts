export interface IExercise {
  id: string;
  title: string;
  details: string;
  status: string;
  group: string;
}

export class Exercise {
  private props: IExercise;

  constructor(props: IExercise) {
    this.props = props;
  }

  public get title(): string {
    return this.props.title;
  }

  public get details(): string {
    return this.props.details;
  }

  public get status(): string {
    return this.props.status;
  }

  public get group(): string {
    return this.props.group;
  }
}
