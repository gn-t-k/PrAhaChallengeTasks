import {
  GetAllTeamDTO,
  IGetAllTeamQueryService,
} from "usecase/query-service-interface/get-all-team-query-service";

export class GetAllTeam {
  private queryService: IGetAllTeamQueryService;

  public constructor(queryService: IGetAllTeamQueryService) {
    this.queryService = queryService;
  }

  public execute = async (): Promise<GetAllTeamDTO> => {
    const result = await this.queryService.execute();

    return result;
  };
}
