import { Request } from "express";
import * as IRequest from "presentation/interface/controller/modules/request-service";

export class GetRequestBody implements IRequest.IGetRequstBody {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: unknown } =>
    // TODO: なんとかしたい
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.req.body;
}
