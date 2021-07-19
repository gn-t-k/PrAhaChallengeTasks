import { Handler, Services } from "controller/http-client-interface";
import * as Usecase from "usecase";

export class ChangeActivityStatusHandler implements Handler {
  public constructor(
    private readonly changeActivityStatusToActiveUsecase: Usecase.ChangeActivityStatusToActive,
    private readonly changeActivityStatusToInRecessUsecase: Usecase.ChangeActivityStatusToInRecess,
    private readonly changeActivityStatusToLeftUsecase: Usecase.ChangeActivityStatusToLeft,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getRequestBody,
      getPathParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;

    try {
      const { status } = getRequestBody.execute();
      const { memberID } = getPathParams.execute();

      switch (status) {
        case 0:
          await this.changeActivityStatusToActiveUsecase.execute(memberID);
          setResponseStatus.execute(200);
          sendResponse.execute();
          break;
        case 1:
          await this.changeActivityStatusToInRecessUsecase.execute(memberID);
          setResponseStatus.execute(200);
          sendResponse.execute();
          break;
        case 2:
          await this.changeActivityStatusToLeftUsecase.execute(memberID);
          setResponseStatus.execute(200);
          sendResponse.execute();
          break;
        default:
          throw new Error("Invalid request");
      }
    } catch (error) {
      setResponseStatus.execute(500);
      sendResponse.execute();
    } finally {
      nextFunction.execute();
    }
  };
}
