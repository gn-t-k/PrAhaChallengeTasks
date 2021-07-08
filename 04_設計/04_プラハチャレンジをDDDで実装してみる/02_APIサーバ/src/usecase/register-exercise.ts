import { Identifier } from "domain/__shared__/identifier";
import { Exercise } from "domain/exercise/entity/exercise";
import { ExerciseGroup } from "domain/exercise/entity/exercise-group";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { ExerciseFactory } from "domain/exercise/service/exercise-factory";
import { Progress } from "domain/progress/entity/progress";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { ProgressStatus } from "domain/progress/value-object/progress-status";
import { IGetAllMemberIDQueryService } from "usecase/query-service-interface/get-all-member-id-query-service";
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
  private readonly getAllMemberIDQueryService: IGetAllMemberIDQueryService;

  public constructor(
    exerciseRepository: IExerciseRepository,
    progressRepository: IProgressRepository,
    getExerciseGroupQueryService: IGetExerciseGroupQueryService,
    getAllMemberIDQueryService: IGetAllMemberIDQueryService,
  ) {
    this.exerciseRepository = exerciseRepository;
    this.progressRepository = progressRepository;
    this.getExerciseGroupQueryService = getExerciseGroupQueryService;
    this.getAllMemberIDQueryService = getAllMemberIDQueryService;
  }

  public execute = async (props: IExecuteProps): Promise<void> => {
    const { title, description, exerciseGroupID } = props;

    const exerciseGroup = await this.getExerciseGroup(exerciseGroupID);

    const exercise = ExerciseFactory.execute({
      title,
      description,
      exerciseGroup,
    });
    const progressList = await this.getProgressList(exercise);

    await this.exerciseRepository.register(exercise);
    await this.progressRepository.register(progressList);
  };

  private getExerciseGroup = async (id: string) => {
    const {
      id: exerciseGroupID,
      name: exerciseGroupName,
    } = await this.getExerciseGroupQueryService.execute(id);

    return ExerciseGroup.rebuild(new Identifier(exerciseGroupID), {
      name: exerciseGroupName,
    });
  };

  private getProgressList = async (exercise: Exercise): Promise<Progress[]> => {
    const memberIDStringList = await this.getAllMemberIDQueryService.execute();

    const memberIDList = memberIDStringList.idList.map(
      (id) => new Identifier(id),
    );
    const exerciseID = exercise.id;
    const status = ProgressStatus.create();

    return memberIDList.map((memberID) =>
      Progress.create({ memberID, exerciseID, status }),
    );
  };
}
