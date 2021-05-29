import {
  IGetAllMemberQueryService,
  GetAllMemberDTO,
} from "usecase/query-service-interface/get-all-member-query-service";

export class GetAllMember {
  private queryService: IGetAllMemberQueryService;

  constructor(queryService: IGetAllMemberQueryService) {
    this.queryService = queryService;
  }

  public async execute(): Promise<GetAllMemberDTO> {
    const result = await this.queryService.execute();

    return result;
  }
}
