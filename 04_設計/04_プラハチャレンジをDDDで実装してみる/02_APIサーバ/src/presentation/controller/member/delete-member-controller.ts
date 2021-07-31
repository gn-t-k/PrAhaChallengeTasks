import {
  ExecuteProps,
  IController,
} from "presentation/interface/controller/controller";
import * as Usecase from "usecase";

export class DeleteMemberController implements IController {
  public constructor(
    private readonly deleteMemberUsecase: Usecase.DeleteMember,
  ) {}

  public execute = async ({
    requestServices,
    responseServices,
    middlewareServices,
  }: ExecuteProps): Promise<void> => {
    const { getPathParams } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middlewareServices;

    try {
      const { memberID } = getPathParams.execute();

      if (!memberID) {
        throw new Error("Invalid request");
      }

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
