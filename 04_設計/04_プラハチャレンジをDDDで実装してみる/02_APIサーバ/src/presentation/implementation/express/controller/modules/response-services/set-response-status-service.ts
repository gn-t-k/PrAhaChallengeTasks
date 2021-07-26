import { Response } from "express";
import { ISetResponseStatus } from "presentation/interface/response-services";

export class SetResponseStatusService implements ISetResponseStatus {
  public constructor(private readonly res: Response) {}

  public execute = (statusCode: number): void => {
    this.res.status(statusCode);
  };
}
