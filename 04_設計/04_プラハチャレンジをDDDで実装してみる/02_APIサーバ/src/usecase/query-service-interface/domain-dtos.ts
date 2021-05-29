export interface MemberDTO {
  id: string;
  name: string;
  email: string;
  activityStatus: string;
}

export interface PairDTO {
  id: string;
  name: string;
  memberList: MemberDTO[];
}

export interface TeamDTO {
  id: string;
  name: string;
  pairList: PairDTO[];
}
