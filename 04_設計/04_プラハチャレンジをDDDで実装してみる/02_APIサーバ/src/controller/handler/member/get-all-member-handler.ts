import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetAllMemberHandler implements Handler {
  public constructor(
    private readonly getAllMemberUsecase: Usecase.GetAllMember,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const { sendResponse, setResponseStatus, nextFunction } = services;
    try {
      const memberList = await this.getAllMemberUsecase.execute();
      setResponseStatus.execute(200);
      sendResponse.execute(memberList);
    } catch (error) {
      setResponseStatus.execute(500);
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
