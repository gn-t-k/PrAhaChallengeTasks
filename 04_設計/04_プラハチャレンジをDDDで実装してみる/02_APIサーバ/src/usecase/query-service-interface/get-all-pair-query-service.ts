interface PairDTO {
  id: string;
  name: string;
  teamID: string;
  memberIDList: string[];
}

export type GetAllPairDTO = PairDTO[];

export interface IGetAllPairQueryService {
  execute(): Promise<GetAllPairDTO>;
}
