import {
  GetAllPairDTO,
  IGetAllPairQueryService,
} from "usecase/query-service-interface/get-all-pair-query-service";

export class GetAllPair {
  private readonly queryService: IGetAllPairQueryService;

  public constructor(queryService: IGetAllPairQueryService) {
    this.queryService = queryService;
  }

  public execute = async (): Promise<GetAllPairDTO> => {
    const result = await this.queryService.execute();

    return result;
  };
}
