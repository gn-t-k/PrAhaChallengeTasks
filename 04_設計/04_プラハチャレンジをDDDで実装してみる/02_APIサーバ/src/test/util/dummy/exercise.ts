import faker from "faker";
import { IExercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";

export const makeDummyExerciseProps = (): IExercise => {
  const title = faker.name.title();
  const details = faker.lorem.paragraphs();
  const group = ExerciseGroup.create({ name: faker.name.title() });

  return { title, details, group };
};
