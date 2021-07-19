import { Handler, Services } from "controller/http-client-interface";
import * as Usecase from "usecase";

export class DeleteMemberHandler implements Handler {
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
      setResponseStatus.execute(500);
      sendResponse.execute(error);
    } finally {
      nextFunction.execute();
    }
  };
}
