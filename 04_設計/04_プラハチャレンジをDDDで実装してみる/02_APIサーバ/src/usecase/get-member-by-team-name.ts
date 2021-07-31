import {
  IGetMemberByTeamNameQueryService,
  GetMemberByTeamNameDTO,
} from "usecase/query-service-interface/get-member-by-team-name-query-service";

export class GetMemberByTeamName {
  private readonly queryService: IGetMemberByTeamNameQueryService;

  public constructor(queryService: IGetMemberByTeamNameQueryService) {
    this.queryService = queryService;
  }

  public execute = async (
    teamName: string,
  ): Promise<GetMemberByTeamNameDTO> => {
    const result = await this.queryService.execute(teamName);

    return result;
  };
}
