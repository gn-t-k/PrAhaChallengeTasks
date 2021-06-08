import { MemberDTO } from "usecase/query-service-interface/entity-dto/member-dto";

export type GetMemberByTeamNameDTO = MemberDTO[];

export interface IGetMemberByTeamNameQueryService {
  execute(teamName: string): Promise<GetMemberByTeamNameDTO>;
}
