import { PrismaClient } from "@prisma/client";
import { Context } from "infrastructure/db/context";
import {
  GetAllPairDTO,
  IGetAllPairQueryService,
} from "usecase/query-service-interface/get-all-pair-query-service";

export class GetAllPairQueryService implements IGetAllPairQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (): Promise<GetAllPairDTO> => {
    const nestedPairDataList = await this.prisma.pair.findMany({
      include: {
        member: true,
      },
    });

    const pairList: GetAllPairDTO = nestedPairDataList.map((nestedPairData) => {
      const { id, name } = nestedPairData;
      const teamID = nestedPairData.teamId;
      const memberIDList = nestedPairData.member.map(
        (memberOnPair) => memberOnPair.memberId,
      );

      return {
        id,
        name,
        teamID,
        memberIDList,
      };
    });

    return pairList;
  };
}
