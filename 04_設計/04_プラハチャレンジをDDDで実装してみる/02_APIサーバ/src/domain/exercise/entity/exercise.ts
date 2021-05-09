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

  public progressStatus(): Exercise {
    const nextProgressStatus = ProgressStatus.getNextProgressStatus(
      this.status,
    );
    // TODO: 何らかの理由で更新に失敗したら、更新前のステータスに戻す処理
    this.props.status = nextProgressStatus;

    return this;
  }

  public regressStatus(): Exercise {
    const previousProgressStatus = ProgressStatus.getPreviousStatus(
      this.status,
    );
    // TODO: 何らかの理由で更新に失敗したら、更新前のステータスに戻す処理
    this.props.status = previousProgressStatus;

    return this;
  }
}
