import {
  GetAllExerciseDTO,
  IGetAllExerciseQueryService,
} from "usecase/query-service-interface/get-all-exercise-query-service";

export class GetAllExercise {
  private queryService: IGetAllExerciseQueryService;

  public constructor(queryService: IGetAllExerciseQueryService) {
    this.queryService = queryService;
  }

  public execute = async (): Promise<GetAllExerciseDTO> => {
    const result = await this.queryService.execute();

    return result;
  };
}
