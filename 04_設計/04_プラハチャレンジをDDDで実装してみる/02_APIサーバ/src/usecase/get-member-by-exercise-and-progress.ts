import {
  IGetMemberByExerciseAndProgressQueryService,
  GetMembeByExerciseAndProgressrDTO,
} from "usecase/query-service-interface/get-member-by-exercise-and-progress-query-service";

export class GetMemberByExerciseAndProgress {
  private readonly queryService: IGetMemberByExerciseAndProgressQueryService;

  public constructor(
    queryService: IGetMemberByExerciseAndProgressQueryService,
  ) {
    this.queryService = queryService;
  }

  public execute = async (
    exerciseIDList: string[],
    progressStatus: string,
    page: number,
  ): Promise<GetMembeByExerciseAndProgressrDTO> => {
    const memberList = await this.queryService.execute(
      exerciseIDList,
      progressStatus,
      page,
    );

    return memberList;
  };
}
