import {
  GetAllTeamDTO,
  IGetAllTeamQueryService,
} from "usecase/query-service-interface/get-all-team-query-service";

export class GetAllTeam {
  private queryService: IGetAllTeamQueryService;

  constructor(queryService: IGetAllTeamQueryService) {
    this.queryService = queryService;
  }

  public async execute(): Promise<GetAllTeamDTO> {
    const result = await this.queryService.execute();

    return result;
  }
}
