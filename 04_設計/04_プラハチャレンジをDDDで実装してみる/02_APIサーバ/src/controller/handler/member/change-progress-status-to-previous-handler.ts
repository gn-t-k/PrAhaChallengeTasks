import { Handler, Services } from "controller/http-client-interface";
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
      setResponseStatus.execute(500);
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
