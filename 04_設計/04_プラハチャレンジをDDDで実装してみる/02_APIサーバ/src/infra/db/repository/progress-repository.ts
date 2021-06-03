import { PrismaClient } from ".prisma/client";
import { Progress } from "domain/progress/entity/progress";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { ProgressStatus } from "domain/progress/value-object/progress-status";
import { Identifier } from "domain/shared/identifier";
import { Context } from "infra/db/context";

export class ProgressRepository implements IProgressRepository {
  private readonly prisma: PrismaClient;

  constructor(context: Context) {
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

  public async getAll(): Promise<Progress[]> {
    const progressList = await this.prisma.exerciseOnMember.findMany();

    return progressList.map((progress) =>
      Progress.create({
        memberID: new Identifier(progress.memberId),
        exerciseID: new Identifier(progress.exerciseId),
        status: ProgressStatus.rebuild({ status: progress.progressStatus }),
      }),
    );
  }
}
