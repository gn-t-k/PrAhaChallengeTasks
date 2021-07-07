import { Identifier } from "domain/__shared__/identifier";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { ExerciseFactory } from "domain/exercise/service/exercise-factory";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { IGetExerciseGroupQueryService } from "usecase/query-service-interface/get-exercise-group-query-service";

interface IExecuteProps {
  title: string;
  description: string;
  exerciseGroupID: string;
}

export class RegisterExercise {
  private readonly exerciseRepository: IExerciseRepository;
  private readonly progressRepository: IProgressRepository;
  private readonly getExerciseGroupQueryService: IGetExerciseGroupQueryService;

  public constructor(
    exerciseRepository: IExerciseRepository,
    progressRepository: IProgressRepository,
    getExerciseGroupQueryService: IGetExerciseGroupQueryService,
  ) {
    this.exerciseRepository = exerciseRepository;
    this.progressRepository = progressRepository;
    this.getExerciseGroupQueryService = getExerciseGroupQueryService;
  }

  public execute = async (props: IExecuteProps): Promise<void> => {
    const {
      id: exerciseGroupID,
      name: exerciseGroupName,
    } = await this.getExerciseGroupQueryService.execute(props.exerciseGroupID);

    const { title, description } = props;
    const exerciseGroup = ExerciseGroup.rebuild(
      new Identifier(exerciseGroupID),
      { name: exerciseGroupName },
    );
    const exercise = ExerciseFactory.execute({
      title,
      description,
      exerciseGroup,
    });

    await this.exerciseRepository.register(exercise);
    // 課題進捗登録
    // 参加者全員分のidが必要だが、全参加者取得するのはオーバーヘッドでかい？idだけとるクエリサービス作る？
  };
}
