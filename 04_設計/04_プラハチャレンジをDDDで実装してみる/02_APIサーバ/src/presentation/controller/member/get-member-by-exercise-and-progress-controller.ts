import {
  IController,
  MiddlewareServices,
  RequestServices,
  ResponseServices,
} from "presentation/interface/controller";
import * as Usecase from "usecase";

export class GetMemberByExerciseAndProgressController implements IController {
  public constructor(
    private readonly getMemberByExerciseAndProgress: Usecase.GetMemberByExerciseAndProgress,
  ) {}

  public execute = async (
    requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ): Promise<void> => {
    const { getQueryParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middleWareServices;

    const progressStatus = getQueryParams.execute()["progress-status"];
    const exerciseIDListString = getQueryParams.execute()["exercise-id"];
    const exerciseIDList = this.convertMultiItemStringToArray(
      exerciseIDListString,
    );
    try {
      const member = await this.getMemberByExerciseAndProgress.execute(
        exerciseIDList,
        progressStatus,
      );
      setResponseStatus.execute(200);
      sendResponse.execute(member);
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

  private convertMultiItemStringToArray = (multiItemString: string): string[] =>
    multiItemString.split(",");
}
