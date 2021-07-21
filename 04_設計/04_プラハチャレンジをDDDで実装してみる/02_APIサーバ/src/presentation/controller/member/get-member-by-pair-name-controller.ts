import {
  Controller,
  Services,
} from "presentation/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetMemberByPairNameController implements Controller {
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
