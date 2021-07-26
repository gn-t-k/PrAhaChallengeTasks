import { Request } from "express";
import * as IRequest from "presentation/interface/controller/modules/request-service";

export class GetPathParamsService implements IRequest.IGetPathParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: string } => this.req.params;
}
