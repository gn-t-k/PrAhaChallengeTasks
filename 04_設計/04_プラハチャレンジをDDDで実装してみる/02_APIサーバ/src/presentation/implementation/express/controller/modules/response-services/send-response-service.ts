import { Response } from "express";
import { ISendResponse } from "presentation/interface/controller";

export class SendResponseService implements ISendResponse {
  public constructor(private readonly res: Response) {}

  public execute = (data?: unknown): void => {
    this.res.send(data);
  };
}
