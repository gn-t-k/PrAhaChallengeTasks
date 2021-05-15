import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";
import { ProgressStatus } from "domain/exercise/value-object/progress-status";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

export interface IExercise {
  title: string;
  details: string;
  status: ProgressStatus;
  group: ExerciseGroup;
}

export class Exercise extends AggregateRoot<IExercise> {
  public get title(): string {
    return this.props.title;
  }

  public get details(): string {
    return this.props.details;
  }

  public get status(): ProgressStatus {
    return this.props.status;
  }

  public get group(): ExerciseGroup {
    return this.props.group;
  }

  private constructor(props: IExercise, id?: Identifier) {
    super(props, id);
  }

  public static create(props: IExercise, id?: Identifier): Exercise {
    if (props.title === "") {
      throw new Error("Illegal title value.");
    }
    if (props.details === "") {
      throw new Error("Illegal details value.");
    }

    return new Exercise(props, id);
  }

  public changeStatusNext(): Exercise {
    this.props.status = ProgressStatus.getNextStatus(this.status);

    return this;
  }

  public changeStatusPrevious(): Exercise {
    if (this.props.status.isCompleted()) {
      throw new Error("Completed exercise cannnot be changed");
    }
    this.props.status = ProgressStatus.getPreviousStatus(this.status);

    return this;
  }
}
