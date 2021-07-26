import {
  ExecuteProps,
  IController,
} from "presentation/interface/controller/controller";
import * as Usecase from "usecase";

export class RegisterMemberController implements IController {
  public constructor(
    private readonly registerMemberUsecase: Usecase.RegisterMember,
  ) {}

  public execute = async ({
    requestServices,
    responseServices,
    middlewareServices,
  }: ExecuteProps): Promise<void> => {
    const { getRequestBody } = requestServices;
    const { setResponseStatus, sendResponse } = responseServices;
    const { nextFunction } = middlewareServices;

    try {
      const { name, email } = getRequestBody.execute();

      if (typeof name !== "string" || typeof email !== "string") {
        throw new Error("Invalid request");
      }

      await this.registerMemberUsecase.execute({ name, email });

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
