import { Handler, Services } from "controller/interface/http-client-interface";
import * as Usecase from "usecase";

export class RegisterMemberHandler implements Handler {
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
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
