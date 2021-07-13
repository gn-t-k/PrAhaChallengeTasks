import { Exercise } from "domain/exercise/entity/exercise";
import { Member } from "domain/member/entity/member";
import { Progress } from "domain/progress/entity/progress";
import { ProgressStatus } from "domain/progress/value-object/progress-status";

interface IProps {
  member: Member;
  exerciseList: Exercise[];
}

export class ProgressFactory {
  public static execute = (props: IProps): Progress[] =>
    props.exerciseList.map((exercise) => {
      const memberID = props.member.id;
      const exerciseID = exercise.id;
      const status = ProgressStatus.create();

      return Progress.create({ memberID, exerciseID, status });
    });
}
