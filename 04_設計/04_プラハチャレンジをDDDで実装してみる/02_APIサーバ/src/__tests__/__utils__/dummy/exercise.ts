import faker from "faker";
import { Exercise, IExercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";

export const makeDummyExerciseProps = (): IExercise => {
  const title = faker.name.title();
  const description = faker.lorem.paragraphs();
  const group = ExerciseGroup.create({ name: faker.name.title() });

  return { title, description, group };
};

export const makeDummyExercise = (): Exercise => {
  const { title, description, group } = makeDummyExerciseProps();

  return Exercise.create({ title, description, group });
};
