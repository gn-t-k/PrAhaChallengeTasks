import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";
import { ProgressStatus } from "domain/exercise/value-object/progress-status";

export interface IExercise {
  id: string;
  title: string;
  details: string;
  status: ProgressStatus;
  group: ExerciseGroup;
}

export class Exercise {
  private props: IExercise;

  constructor(props: IExercise) {
    if (props.title === "") {
      throw new Error("Illegal title value.");
    }
    if (props.details === "") {
      throw new Error("Illegal details value.");
    }

    this.props = props;
  }

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
