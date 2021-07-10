import { PrismaClient } from "@prisma/client";
import { Identifier } from "domain/__shared__/identifier";
import { Progress } from "domain/progress/entity/progress";
import {
  IGetOne,
  IProgressRepository,
} from "domain/progress/progress-repository-interface";
import { ProgressStatus } from "domain/progress/value-object/progress-status";
import { Context } from "infrastructure/db/context";

export class ProgressRepository implements IProgressRepository {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public register = async (progressList: Progress[]): Promise<void> => {
    await this.prisma.exerciseOnMember.createMany({
      data: progressList.map((progress) => {
        const memberId = progress.memberID.value;
        const exerciseId = progress.exerciseID.value;
        const progressStatus = progress.status.value;

        return {
          memberId,
          exerciseId,
          progressStatus,
        };
      }),
    });
  };

  public getOne = async (props: IGetOne): Promise<Progress> => {
    const exerciseOnMemberData = await this.prisma.exerciseOnMember.findUnique({
      where: {
        memberId_exerciseId: {
          memberId: props.memberID.value,
          exerciseId: props.exerciseID.value,
        },
      },
    });

    if (exerciseOnMemberData === null) {
      throw new Error("Progress is not exists");
    }

    return Progress.create({
      memberID: new Identifier(exerciseOnMemberData.memberId),
      exerciseID: new Identifier(exerciseOnMemberData.exerciseId),
      status: ProgressStatus.rebuild({
        status: exerciseOnMemberData.progressStatus,
      }),
    });
  };

  public getAll = async (): Promise<Progress[]> => {
    const progressList = await this.prisma.exerciseOnMember.findMany();

    return progressList.map((progress) =>
      Progress.create({
        memberID: new Identifier(progress.memberId),
        exerciseID: new Identifier(progress.exerciseId),
        status: ProgressStatus.rebuild({ status: progress.progressStatus }),
      }),
    );
  };

  public update = async (progress: Progress): Promise<void> => {
    await this.prisma.exerciseOnMember.update({
      where: {
        memberId_exerciseId: {
          memberId: progress.memberID.value,
          exerciseId: progress.exerciseID.value,
        },
      },
      data: {
        progressStatus: progress.status.value,
      },
    });
  };
}
