import {
  MemberDTO,
  TeamDTO,
} from "usecase/query-service-interface/domain-dtos";

export interface GetAllMemberDTO {
  teamList: TeamDTO[];
  independentMemberList?: MemberDTO[];
}

export interface IGetAllMemberQueryService {
  execute(): Promise<GetAllMemberDTO>;
}
