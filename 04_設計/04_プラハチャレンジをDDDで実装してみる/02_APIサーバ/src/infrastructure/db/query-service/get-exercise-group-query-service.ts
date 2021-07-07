import { PrismaClient } from "@prisma/client";
import { Context } from "infrastructure/db/context";
import {
  IGetExerciseGroupQueryService,
  ExerciseGroupDTO,
} from "usecase/query-service-interface/get-exercise-group-query-service";

export class GetExerciseGroupQueryService
  implements IGetExerciseGroupQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (id: string): Promise<ExerciseGroupDTO> => {
    const exerciseGroup = await this.prisma.exerciseGroup.findUnique({
      where: {
        id,
      },
    });

    if (exerciseGroup === null) {
      throw new Error("Exercise group is not exists");
    }

    return exerciseGroup;
  };
}
