import { Request } from "express";
import * as IRequest from "presentation/interface/controller/modules/request-service";

export class GetQueryParamsService implements IRequest.IGetQueryParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: string } =>
    /**
     * TODO: なんとかしたい
     * 参考: http://expressjs.com/ja/api.html#req.query
     */
    this.req.query as { [key: string]: string };
}
