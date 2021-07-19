import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetMemberByExerciseAndProgressHandler implements Handler {
  public constructor(
    private readonly getMemberByExerciseAndProgress: Usecase.GetMemberByExerciseAndProgress,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getQueryParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;
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
