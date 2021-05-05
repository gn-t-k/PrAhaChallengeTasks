import { Exercise, IExercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";
import faker from "faker";

export const makeDummyExerciseProps = (): IExercise => {
  const id = faker.lorem.slug();
  const title = faker.name.title();
  const details = faker.lorem.paragraphs();
  const status = faker.lorem.word();
  const group = new ExerciseGroup({ name: faker.name.title() });

  return { id, title, details, status, group };
};

export const makeDummyExercise = (): Exercise => {
  const { id, title, details, status, group } = makeDummyExerciseProps();

  return new Exercise({ id, title, details, status, group });
};
