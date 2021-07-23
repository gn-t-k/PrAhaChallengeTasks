import {
  IController,
  MiddlewareServices,
  RequestServices,
  ResponseServices,
} from "presentation/interface/controller";
import * as Usecase from "usecase";

export class GetMemberByPairNameController implements IController {
  public constructor(
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
  ) {}

  public execute = async (
    requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ): Promise<void> => {
    const { getQueryParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middleWareServices;

    const teamName = getQueryParams.execute()["team-name"];
    const pairName = getQueryParams.execute()["pair-name"];
    try {
      const member = await this.getMemberByPairNameUsecase.execute(
        teamName,
        pairName,
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
}
