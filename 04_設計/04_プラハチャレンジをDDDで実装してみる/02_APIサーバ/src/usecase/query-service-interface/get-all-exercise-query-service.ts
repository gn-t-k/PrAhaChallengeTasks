interface ExerciseDTO {
  id: string;
  title: string;
  description: string;
  exerciseGroup: string;
}

export type GetAllExerciseDTO = ExerciseDTO[];

export interface IGetAllExerciseQueryService {
  execute(): Promise<GetAllExerciseDTO>;
}
