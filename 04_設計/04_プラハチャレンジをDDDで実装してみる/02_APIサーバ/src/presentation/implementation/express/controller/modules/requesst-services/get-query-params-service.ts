import { Request } from "express";
import { IGetQueryParams } from "presentation/interface/request-services";

export class GetQueryParamsService implements IGetQueryParams {
  public constructor(private readonly req: Request) {}

  public execute = (): { [key: string]: string } =>
    /**
     * TODO: なんとかしたい
     * 参考: http://expressjs.com/ja/api.html#req.query
     */
    this.req.query as { [key: string]: string };
}
