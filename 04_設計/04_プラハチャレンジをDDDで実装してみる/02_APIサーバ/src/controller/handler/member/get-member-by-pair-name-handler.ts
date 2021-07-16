import { Handler, Services } from "controller/http-client-interface";
import * as Usecase from "usecase";

export class GetMemberByPairNameHandler implements Handler {
  public constructor(
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
    private readonly teamName: string,
    private readonly pairName: string,
  ) {}

  public execute = async (servises: Services): Promise<void> => {
    const { setResponseStatus, sendResponse, nextFunction } = servises;
    try {
      const member = await this.getMemberByPairNameUsecase.execute(
        this.teamName,
        this.pairName,
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
