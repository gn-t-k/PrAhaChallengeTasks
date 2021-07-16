import { Response } from "express";
import { ISendResponse } from "controller/http-client-interface";

export class SendResponseService implements ISendResponse {
  public constructor(private readonly res: Response) {}

  public execute = (data: unknown): void => {
    this.res.send(data);
  };
}
