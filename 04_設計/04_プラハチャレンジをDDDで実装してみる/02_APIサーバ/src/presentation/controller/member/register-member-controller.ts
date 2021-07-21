import {
  Controller,
  Services,
} from "presentation/interface/http-client-interface";
import * as Usecase from "usecase";

export class RegisterMemberController implements Controller {
  public constructor(
    private readonly registerMemberUsecase: Usecase.RegisterMember,
  ) {}

  public execute = async (services: Services): Promise<void> => {
    const {
      getRequestBody,
      setResponseStatus,
      sendResponse,
      nextFunction,
    } = services;

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
