import { PrismaClient } from ".prisma/client";
import { ProgressStatus } from "domain/progress/value-object/progress-status";
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
    take: number,
    page: number,
  ): Promise<GetMembeByExerciseAndProgressrDTO> => {
    await this.validateProps(exerciseIDList, progressStatus, page);

    const skip = take * (page - 1);

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

  private validateProps = async (
    exerciseIDList: string[],
    progressStatus: string,
    page: number,
  ) => {
    await this.validateExerciseIDList(exerciseIDList);
    this.validateProgressStatus(progressStatus);
    this.validatePage(page);
  };

  private validateExerciseIDList = async (exerciseIDList: string[]) => {
    const exerciseList = await this.prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIDList,
        },
      },
    });

    const isAllExerciseExist = exerciseList.length === exerciseIDList.length;

    return isAllExerciseExist;
  };

  private validateProgressStatus = (progressStatus: string) => {
    if (!ProgressStatus.isValidString(progressStatus)) {
      throw new Error("Invalid status value");
    }
  };

  private validatePage = (page: number) => {
    if (page < 1 || !Number.isInteger(page)) {
      throw new Error("Invalid page value");
    }
  };
}
