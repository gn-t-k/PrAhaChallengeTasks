import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class ChangeProgressStatusToPreviousHandler implements Handler {
  public constructor(
    private readonly changeProgressStatusToPreviousUsecase: Usecase.ChangeProgressStatusPrevious,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getPathParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;

    try {
      const { memberID, exerciseID } = getPathParams.execute();

      await this.changeProgressStatusToPreviousUsecase.execute(
        memberID,
        exerciseID,
      );

      setResponseStatus.execute(200);
      sendResponse.execute();
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
}
