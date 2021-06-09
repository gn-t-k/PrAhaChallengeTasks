import { MemberDTO } from "usecase/query-service-interface/entity-dto/member-dto";

interface OneOfGetMemberByTeamNameDTO extends MemberDTO {
  pairID: string;
  teamID: string;
}

export type GetMemberByTeamNameDTO = OneOfGetMemberByTeamNameDTO[];

export interface IGetMemberByTeamNameQueryService {
  execute(teamName: string): Promise<GetMemberByTeamNameDTO>;
}
