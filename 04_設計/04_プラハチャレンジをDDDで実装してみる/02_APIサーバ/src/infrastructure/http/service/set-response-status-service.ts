import { Response } from "express";
import { ISetResponseStatus } from "controller/http-client-interface";

export class SetResponseStatusService implements ISetResponseStatus {
  public constructor(private readonly res: Response) {}

  public execute = (statusCode: number): void => {
    this.res.status(statusCode);
  };
}
