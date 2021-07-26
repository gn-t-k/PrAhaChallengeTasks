import { Request } from "express";
import { IGetRequstBody } from "presentation/interface/request-services";

export class GetRequestBody implements IGetRequstBody {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: unknown } =>
    // TODO: なんとかしたい
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.req.body;
}
