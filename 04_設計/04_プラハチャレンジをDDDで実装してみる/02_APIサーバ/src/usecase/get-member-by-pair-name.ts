import {
  GetMemberByPairNameDTO,
  IGetMemberByPairNameQueryService,
} from "usecase/query-service-interface/get-member-by-pair-name-query-service";

export class GetMemberByPairName {
  private readonly queryService: IGetMemberByPairNameQueryService;

  public constructor(queryService: IGetMemberByPairNameQueryService) {
    this.queryService = queryService;
  }

  public execute = async (
    teamName: string,
    pairName: string,
  ): Promise<GetMemberByPairNameDTO> => {
    const result = await this.queryService.execute(teamName, pairName);

    return result;
  };
}
