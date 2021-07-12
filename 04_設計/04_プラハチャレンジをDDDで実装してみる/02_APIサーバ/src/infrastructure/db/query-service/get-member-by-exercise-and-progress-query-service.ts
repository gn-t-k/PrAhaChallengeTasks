import { PrismaClient } from ".prisma/client";
import { Context } from "infrastructure/db/context";
import {
  IGetMemberByExerciseAndProgressQueryService,
  GetMembeByExerciseAndProgressrDTO,
} from "usecase/query-service-interface/get-member-by-exercise-and-progress-query-service";

export class GetMemberByExerciseAndProgressQueryService
  implements IGetMemberByExerciseAndProgressQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (
    exerciseIDList: string[],
    progressStatus: string,
    page: number,
  ): Promise<GetMembeByExerciseAndProgressrDTO> => {
    const take = 10;
    const skip = take * page;

    const memberDataList = await this.prisma.member.findMany({
      include: {
        exercise: true,
      },
      where: {
        exercise: {
          some: {
            exerciseId: {
              in: exerciseIDList,
            },
            progressStatus,
          },
        },
      },
      skip,
      take,
    });

    return memberDataList.map((memberData) => {
      const { id, name, email, activityStatus } = memberData;

      return {
        id,
        name,
        email,
        activityStatus,
      };
    });
  };
}
