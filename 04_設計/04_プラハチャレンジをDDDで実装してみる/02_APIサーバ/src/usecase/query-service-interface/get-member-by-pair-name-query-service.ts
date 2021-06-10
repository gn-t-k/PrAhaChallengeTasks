interface MemberDTO {
  id: string;
  name: string;
  email: string;
  activityStatus: string;
  pairID: string;
  teamID: string;
}

export type GetMemberByPairNameDTO = MemberDTO[];

export interface IGetMemberByPairNameQueryService {
  execute(teamName: string, pairName: string): Promise<GetMemberByPairNameDTO>;
}
