import { Response } from "express";
import * as IResponse from "presentation/interface/controller/modules/response-service";

export class SendResponseService implements IResponse.ISendResponse {
  public constructor(private readonly res: Response) {}

  public execute = (data?: unknown): void => {
    this.res.send(data);
  };
}
