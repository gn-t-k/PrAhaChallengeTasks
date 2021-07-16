import { Request } from "express";
import { IGetPathParams } from "controller/http-client-interface";

export class GetPathParamsService implements IGetPathParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: unknown } => this.req.params;
}
