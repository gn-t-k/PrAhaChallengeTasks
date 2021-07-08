export interface GetAllMemberIDDTO {
  idList: string[];
}

export interface IGetAllMemberIDQueryService {
  execute(): Promise<GetAllMemberIDDTO>;
}
