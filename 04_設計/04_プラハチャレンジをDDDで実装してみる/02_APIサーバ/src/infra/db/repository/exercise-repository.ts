import { PrismaClient } from ".prisma/client";
import { Exercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { Identifier } from "domain/shared/identifier";
import { Context } from "infra/db/context";

export class ExerciseRepository implements IExerciseRepository {
  private readonly prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public async getAll(): Promise<Exercise[]> {
    const [exerciseList, exerciseGroupList] = await Promise.all([
      this.prisma.exercise.findMany(),
      this.prisma.exerciseGroup.findMany(),
    ]);

    return exerciseList.map((exerciseData) => {
      const groupData = exerciseGroupList.find(
        (group) => group.id === exerciseData.exerciseGroupId,
      );

      if (!groupData) {
        throw new Error("Illegal group data");
      }

      const group = ExerciseGroup.rebuild(new Identifier(groupData.id), {
        name: groupData.name,
      });
      const { title, description } = exerciseData;
      const exercise = Exercise.rebuild(new Identifier(exerciseData.id), {
        title,
        description,
        group,
      });

      return exercise;
    });
  }
}
