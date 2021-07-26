import {
  ExecuteProps,
  IController,
} from "presentation/interface/controller/controller";
import * as Usecase from "usecase";

export class GetMemberController implements IController {
  public static readonly TEAM_NAME_QUERY = "team-name";
  public static readonly PAIR_NAME_QUERY = "pair-name";
  public static readonly EXERCISE_ID_QUERY = "exercise-id";
  public static readonly PROGRESS_STATUS_QUERY = "progress-status";

  public constructor(
    private readonly getAllMemberUsecase: Usecase.GetAllMember,
    private readonly getMemberByTeamNameUsecase: Usecase.GetMemberByTeamName,
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
    private readonly getMemberByExerciseAndProgressUsecase: Usecase.GetMemberByExerciseAndProgress,
  ) {}

  public execute = async ({
    requestServices,
    responseServices,
    middlewareServices,
  }: ExecuteProps): Promise<void> => {
    const { getQueryParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middlewareServices;

    try {
      const params = getQueryParams.execute();

      this.validateParams(params);

      if (this.isGetAllMemberUsecaseParamsPattern(params)) {
        const memberList = await this.getAllMemberUsecase.execute();

        setResponseStatus.execute(200);
        sendResponse.execute(memberList);

        return;
      }

      if (this.isGetMemberByTeamNameUsecaseParamsPattern(params)) {
        const memberList = await this.getMemberByTeamNameUsecase.execute(
          params[GetMemberController.TEAM_NAME_QUERY],
        );

        setResponseStatus.execute(200);
        sendResponse.execute(memberList);

        return;
      }

      if (this.isGetMemberByPairNameUsecaseParamsPattern(params)) {
        const memberList = await this.getMemberByPairNameUsecase.execute(
          params[GetMemberController.TEAM_NAME_QUERY],
          params[GetMemberController.PAIR_NAME_QUERY],
        );

        setResponseStatus.execute(200);
        sendResponse.execute(memberList);

        return;
      }

      if (this.isGetMemberByExerciseAndProgressUsecaseParamsPattern(params)) {
        const memberList = await this.getMemberByExerciseAndProgressUsecase.execute(
          params[GetMemberController.EXERCISE_ID_QUERY].split(","),
          params[GetMemberController.PROGRESS_STATUS_QUERY],
        );

        setResponseStatus.execute(200);
        sendResponse.execute(memberList);

        return;
      }

      throw new Error("Invalid query params");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      // TODO: なんでも500にしてしまっているので、例外クラスを作って出し分けできるようにする
      setResponseStatus.execute(500);
      sendResponse.execute({ message });
    } finally {
      nextFunction.execute();
    }
  };

  /**
   * TODO: かなり無理矢理やっているので、もうちょっとスマートにやりたい
   */
  private isGetAllMemberUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[GetMemberController.TEAM_NAME_QUERY] === undefined &&
    params[GetMemberController.PAIR_NAME_QUERY] === undefined &&
    params[GetMemberController.EXERCISE_ID_QUERY] === undefined &&
    params[GetMemberController.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByTeamNameUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[GetMemberController.TEAM_NAME_QUERY] !== undefined &&
    params[GetMemberController.PAIR_NAME_QUERY] === undefined &&
    params[GetMemberController.EXERCISE_ID_QUERY] === undefined &&
    params[GetMemberController.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByPairNameUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[GetMemberController.TEAM_NAME_QUERY] !== undefined &&
    params[GetMemberController.PAIR_NAME_QUERY] !== undefined &&
    params[GetMemberController.EXERCISE_ID_QUERY] === undefined &&
    params[GetMemberController.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByExerciseAndProgressUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[GetMemberController.TEAM_NAME_QUERY] === undefined &&
    params[GetMemberController.PAIR_NAME_QUERY] === undefined &&
    params[GetMemberController.EXERCISE_ID_QUERY] !== undefined &&
    params[GetMemberController.PROGRESS_STATUS_QUERY] !== undefined;

  private validateParams = (params: { [key: string]: string }) => {
    // paramsがObject型ではないため
    // eslint-disable-next-line no-restricted-syntax
    for (const property in params) {
      if (
        property !== GetMemberController.TEAM_NAME_QUERY &&
        property !== GetMemberController.PAIR_NAME_QUERY &&
        property !== GetMemberController.EXERCISE_ID_QUERY &&
        property !== GetMemberController.PROGRESS_STATUS_QUERY
      ) {
        throw new Error("Invalid query params");
      }
    }
  };
}
