import {
  IController,
  MiddlewareServices,
  RequestServices,
  ResponseServices,
} from "presentation/interface/controller";
import * as Usecase from "usecase";

export class GetAllMemberController implements IController {
  public constructor(
    private readonly getAllMemberUsecase: Usecase.GetAllMember,
  ) {}

  public execute = async (
    _requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ): Promise<void> => {
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middleWareServices;

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
