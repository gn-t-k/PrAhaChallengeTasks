import {
  Controller,
  Services,
} from "presentation/interface/http-client-interface";
import * as Usecase from "usecase";

export class DeleteMemberController implements Controller {
  public constructor(
    private readonly deleteMemberUsecase: Usecase.DeleteMember,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getPathParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;

    try {
      const { memberID } = getPathParams.execute();

      await this.deleteMemberUsecase.execute(memberID);

      setResponseStatus.execute(200);
      sendResponse.execute();
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
