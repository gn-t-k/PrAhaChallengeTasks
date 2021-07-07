import { Identifier } from "domain/__shared__/identifier";
import { Exercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";

export interface IProps {
  title: string;
  description: string;
  exerciseGroup: ExerciseGroup;
  id?: string;
}

export class ExerciseFactory {
  public static execute = (props: IProps): Exercise => {
    const id = props.id ? new Identifier(props.id) : new Identifier();
    const { title, description } = props;
    const group = props.exerciseGroup;

    return Exercise.rebuild(id, {
      title,
      description,
      group,
    });
  };
}
