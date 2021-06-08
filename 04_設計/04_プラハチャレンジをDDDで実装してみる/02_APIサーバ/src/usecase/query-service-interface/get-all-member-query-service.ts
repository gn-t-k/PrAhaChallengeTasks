import { MemberDTO } from "usecase/query-service-interface/entity-dto/member-dto";

export type GetAllMemberDTO = MemberDTO[];

export interface IGetAllMemberQueryService {
  execute(): Promise<GetAllMemberDTO>;
}
