import { Handler, Services } from "controller/http-client-interface";
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
      setResponseStatus.execute(500);
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
