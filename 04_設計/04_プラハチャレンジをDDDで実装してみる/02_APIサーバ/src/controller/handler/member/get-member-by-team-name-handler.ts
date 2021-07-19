import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetMemberByTeamNameHandler implements Handler {
  public constructor(
    private readonly getMemberByTeamNameUsecase: Usecase.GetMemberByTeamName,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getQueryParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;

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
