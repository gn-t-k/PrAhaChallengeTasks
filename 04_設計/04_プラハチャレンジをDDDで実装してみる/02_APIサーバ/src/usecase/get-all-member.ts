import {
  IGetAllMemberQueryService,
  GetAllMemberDTO,
} from "usecase/query-service-interface/get-all-member-query-service";

export class GetAllMember {
  private queryService: IGetAllMemberQueryService;

  public constructor(queryService: IGetAllMemberQueryService) {
    this.queryService = queryService;
  }

  public execute = async (): Promise<GetAllMemberDTO> => {
    const result = await this.queryService.execute();

    return result;
  };
}
