import { Request } from "express";
import { IGetQueryParams } from "controller/http-client-interface";

export class GetQueryParamsService implements IGetQueryParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: unknown } => this.req.query;
}
