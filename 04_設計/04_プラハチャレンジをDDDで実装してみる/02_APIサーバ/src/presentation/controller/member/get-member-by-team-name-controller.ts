import {
  IController,
  MiddlewareServices,
  RequestServices,
  ResponseServices,
} from "presentation/interface/controller";
import * as Usecase from "usecase";

export class GetMemberByTeamNameController implements IController {
  public constructor(
    private readonly getMemberByTeamNameUsecase: Usecase.GetMemberByTeamName,
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
      const teamName = getQueryParams.execute()["team-name"];
      const member = await this.getMemberByTeamNameUsecase.execute(teamName);
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
