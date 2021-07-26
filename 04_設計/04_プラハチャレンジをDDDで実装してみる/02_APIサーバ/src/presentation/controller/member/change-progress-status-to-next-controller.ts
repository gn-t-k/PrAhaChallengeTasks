import {
  ExecuteProps,
  IController,
} from "presentation/interface/controller/controller";
import * as Usecase from "usecase";

export class ChangeProgressStatusToNextController implements IController {
  public constructor(
    private readonly changeProgressStatusToNextUsecase: Usecase.ChangeProgressStatusNext,
  ) {}

  public execute = async ({
    requestServices,
    responseServices,
    middlewareServices,
  }: ExecuteProps): Promise<void> => {
    const { getPathParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middlewareServices;

    try {
      const { memberID, exerciseID } = getPathParams.execute();

      if (!memberID || !exerciseID) {
        throw new Error("Invalid request");
      }

      await this.changeProgressStatusToNextUsecase.execute(
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
