import { PrismaClient } from "@prisma/client";
import { Context } from "infra/db/context";
import {
  GetAllTeamDTO,
  IGetAllTeamQueryService,
} from "usecase/query-service-interface/get-all-team-query-service";

export class GetAllTeamQueryService implements IGetAllTeamQueryService {
  private readonly prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public async execute(): Promise<GetAllTeamDTO> {
    const teamDataList = await this.prisma.team.findMany({
      include: { pair: true },
    });

    return teamDataList.map((teamData) => {
      const { id, name } = teamData;
      const pairIDList = teamData.pair.map((pairData) => pairData.id);

      return {
        id,
        name,
        pairIDList,
      };
    });
  }
}
