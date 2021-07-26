import { Request } from "express";
import { IGetPathParams } from "presentation/interface/request-services";

export class GetPathParamsService implements IGetPathParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: string } => this.req.params;
}
