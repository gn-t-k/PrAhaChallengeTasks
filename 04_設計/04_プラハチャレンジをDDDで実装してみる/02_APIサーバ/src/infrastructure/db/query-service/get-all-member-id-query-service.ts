import { PrismaClient } from ".prisma/client";
import { Context } from "infrastructure/db/context";
import {
  GetAllMemberIDDTO,
  IGetAllMemberIDQueryService,
} from "usecase/query-service-interface/get-all-member-id-query-service";

export class GetAllMemberIDQueryService implements IGetAllMemberIDQueryService {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public execute = async (): Promise<GetAllMemberIDDTO> => {
    const idList = await this.prisma.member.findMany({
      select: {
        id: true,
      },
    });

    return {
      idList: idList.map((m) => m.id),
    };
  };
}
