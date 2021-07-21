import {
  Controller,
  Services,
} from "presentation/interface/http-client-interface";
import * as Usecase from "usecase";

export class GetAllMemberController implements Controller {
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
