import {
  IGetAllMemberQueryService,
  ITeamStructure,
} from "usecase/query-service-interface/get-all-member-query-service";

export class GetAllMember {
  private queryService: IGetAllMemberQueryService;

  constructor(queryService: IGetAllMemberQueryService) {
    this.queryService = queryService;
  }

  public async execute(): Promise<ITeamStructure> {
    const result = await this.queryService.execute();

    return result;
  }
}
