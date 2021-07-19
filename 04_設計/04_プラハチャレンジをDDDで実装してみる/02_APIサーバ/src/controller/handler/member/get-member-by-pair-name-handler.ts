import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetMemberByPairNameHandler implements Handler {
  public constructor(
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
  ) {}

  public execute = async (servises: Services): Promise<void> => {
    const {
      getQueryParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = servises;
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
      setResponseStatus.execute(500);
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
