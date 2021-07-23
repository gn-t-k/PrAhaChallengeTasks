import {
  IController,
  MiddlewareServices,
  RequestServices,
  ResponseServices,
} from "presentation/interface/controller";
import { MemberRouteRegistrar } from "presentation/route-registrar";
import * as Usecase from "usecase";

export class GetMemberController implements IController {
  public constructor(
    private readonly getAllMemberUsecase: Usecase.GetAllMember,
    private readonly getMemberByTeamNameUsecase: Usecase.GetMemberByTeamName,
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
    private readonly getMemberByExerciseAndProgressUsecase: Usecase.GetMemberByExerciseAndProgress,
  ) {}

  public execute = async (
    requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ): Promise<void> => {
    const { getQueryParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middleWareServices;

    try {
      const params = getQueryParams.execute();

      this.validateParams(params);

      if (this.isGetAllMemberUsecaseParamsPattern(params)) {
        await this.getAllMemberUsecase.execute();

        return;
      }

      if (this.isGetMemberByTeamNameUsecaseParamsPattern(params)) {
        await this.getMemberByTeamNameUsecase.execute(
          params[MemberRouteRegistrar.TEAM_NAME_QUERY],
        );

        return;
      }

      if (this.isGetMemberByPairNameUsecaseParamsPattern(params)) {
        await this.getMemberByPairNameUsecase.execute(
          params[MemberRouteRegistrar.TEAM_NAME_QUERY],
          params[MemberRouteRegistrar.PAIR_NAME_QUERY],
        );

        return;
      }

      if (this.isGetMemberByExerciseAndProgressUsecaseParamsPattern(params)) {
        await this.getMemberByExerciseAndProgressUsecase.execute(
          params[MemberRouteRegistrar.EXERCISE_ID_QUERY].split(","),
          params[MemberRouteRegistrar.PROGRESS_STATUS_QUERY],
        );
      }
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

  private isGetAllMemberUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[MemberRouteRegistrar.TEAM_NAME_QUERY] === undefined &&
    params[MemberRouteRegistrar.PAIR_NAME_QUERY] === undefined &&
    params[MemberRouteRegistrar.EXERCISE_ID_QUERY] === undefined &&
    params[MemberRouteRegistrar.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByTeamNameUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[MemberRouteRegistrar.TEAM_NAME_QUERY] !== undefined &&
    params[MemberRouteRegistrar.PAIR_NAME_QUERY] === undefined &&
    params[MemberRouteRegistrar.EXERCISE_ID_QUERY] === undefined &&
    params[MemberRouteRegistrar.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByPairNameUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[MemberRouteRegistrar.TEAM_NAME_QUERY] !== undefined &&
    params[MemberRouteRegistrar.PAIR_NAME_QUERY] !== undefined &&
    params[MemberRouteRegistrar.EXERCISE_ID_QUERY] === undefined &&
    params[MemberRouteRegistrar.PROGRESS_STATUS_QUERY] === undefined;

  private isGetMemberByExerciseAndProgressUsecaseParamsPattern = (params: {
    [key: string]: string;
  }) =>
    params[MemberRouteRegistrar.TEAM_NAME_QUERY] === undefined &&
    params[MemberRouteRegistrar.PAIR_NAME_QUERY] === undefined &&
    params[MemberRouteRegistrar.EXERCISE_ID_QUERY] !== undefined &&
    params[MemberRouteRegistrar.PROGRESS_STATUS_QUERY] !== undefined;

  private validateParams = (params: { [key: string]: string }) => {
    // paramsがObject型ではないため
    // eslint-disable-next-line no-restricted-syntax
    for (const property in params) {
      if (
        property !== MemberRouteRegistrar.TEAM_NAME_QUERY &&
        property !== MemberRouteRegistrar.PAIR_NAME_QUERY &&
        property !== MemberRouteRegistrar.EXERCISE_ID_QUERY &&
        property !== MemberRouteRegistrar.PROGRESS_STATUS_QUERY
      ) {
        throw new Error("Invalid query params");
      }
    }
  };
}
