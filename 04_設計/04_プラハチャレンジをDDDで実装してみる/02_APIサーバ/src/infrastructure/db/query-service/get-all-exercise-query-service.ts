import { PrismaClient } from "@prisma/client";
import { Context } from "infrastructure/db/context";
import {
  GetAllExerciseDTO,
  IGetAllExerciseQueryService,
} from "usecase/query-service-interface/get-all-exercise-query-service";

export class GetAllExerciseQueryService implements IGetAllExerciseQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (): Promise<GetAllExerciseDTO> => {
    const exerciseDataList = await this.prisma.exercise.findMany({
      include: {
        exerciseGroup: true,
      },
    });

    return exerciseDataList.map((exerciseData) => {
      const { id, title, description } = exerciseData;
      const exerciseGroup = exerciseData.exerciseGroup.name;

      return {
        id,
        title,
        description,
        exerciseGroup,
      };
    });
  };
}
