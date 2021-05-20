import faker from "faker";
import { IExercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";
import { ProgressStatus } from "domain/exercise/value-object/progress-status";

export const makeDummyExerciseProps = (): IExercise => {
  const title = faker.name.title();
  const details = faker.lorem.paragraphs();
  const status = ProgressStatus.create();
  const group = ExerciseGroup.create({ name: faker.name.title() });

  return { title, details, status, group };
};
