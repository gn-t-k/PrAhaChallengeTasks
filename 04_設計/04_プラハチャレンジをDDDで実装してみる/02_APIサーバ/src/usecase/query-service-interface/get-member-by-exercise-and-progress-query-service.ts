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
    page: number,
  ): Promise<GetMembeByExerciseAndProgressrDTO>;
}
