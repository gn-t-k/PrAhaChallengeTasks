export interface ExerciseGroupDTO {
  id: string;
  name: string;
}

export interface IGetExerciseGroupQueryService {
  execute(id: string): Promise<ExerciseGroupDTO>;
}
