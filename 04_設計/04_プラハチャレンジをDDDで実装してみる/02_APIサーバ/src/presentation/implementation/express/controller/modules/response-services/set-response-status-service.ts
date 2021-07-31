import { Response } from "express";
import * as IResponse from "presentation/interface/controller/modules/response-service";

export class SetResponseStatusService implements IResponse.ISetResponseStatus {
  public constructor(private readonly res: Response) {}

  public execute = (statusCode: number): void => {
    this.res.status(statusCode);
  };
}
