interface MemberDTO {
  id: string;
  name: string;
  email: string;
  activityStatus: string;
}

export type GetMembeByExerciseAndProgressrDTO = MemberDTO[];

export interface IGetMemberByExerciseAndProgressQueryService {
  execute(
    exerciseIDList: string[],
    progressStatus: string,
    take: number,
    page: number,
  ): Promise<GetMembeByExerciseAndProgressrDTO>;
}
