interface MemberDTO {
  id: string;
  name: string;
  email: string;
  activityStatus: string;
  pairID: string;
  teamID: string;
}

export type GetMemberByTeamNameDTO = MemberDTO[];

export interface IGetMemberByTeamNameQueryService {
  execute(teamName: string): Promise<GetMemberByTeamNameDTO>;
}
