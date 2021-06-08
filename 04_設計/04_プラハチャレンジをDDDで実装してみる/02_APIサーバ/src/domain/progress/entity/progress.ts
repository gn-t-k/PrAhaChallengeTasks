import { ProgressStatus } from "domain/progress/value-object/progress-status";
import { AggregateRoot } from "domain/shared/aggregate-root";
import { Identifier } from "domain/shared/identifier";

interface IProgress {
  memberID: Identifier;
  exerciseID: Identifier;
  status: ProgressStatus;
}

export class Progress extends AggregateRoot<IProgress> {
  public get memberID(): Identifier {
    return this.props.memberID;
  }

  public get exerciseID(): Identifier {
    return this.props.exerciseID;
  }

  public get status(): ProgressStatus {
    return this.props.status;
  }

  public static create = (props: IProgress): Progress => new Progress(props);

  public changeStatusNext = (): Progress => {
    this.props.status = this.props.status.getNext();

    return this;
  };

  public changeStatusPrevious = (): Progress => {
    if (this.props.status.isDone()) {
      throw new Error("Done status cannot change previous");
    }

    this.props.status = this.props.status.getPrevious();

    return this;
  };

  public equals = (progress: Progress): boolean =>
    this.props.memberID.equals(progress.memberID) &&
    this.props.exerciseID.equals(progress.exerciseID);
}
