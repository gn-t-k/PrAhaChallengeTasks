/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from "express";
import {
  Handler,
  IClient,
  PathAndQuery,
  Services,
} from "controller/http-client-interface";
import * as Service from "infrastructure/http/service";

export class Client implements IClient {
  public constructor(private readonly router: Router) {}

  public registerGetRoute = (
    pathAndQuery: PathAndQuery,
    handler: Handler,
  ): void => {
    this.router.get(
      pathAndQuery.path,
      async (req: Request, res: Response, next: NextFunction) => {
        const services = this.getServices(req, res, next);

        await handler.execute(services);
      },
    );
  };

  private getServices = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Services => {
    const getPathParams = new Service.GetPathParamsService(req);
    const getQueryParams = new Service.GetQueryParamsService(req);
    const setResponseStatus = new Service.SetResponseStatusService(res);
    const sendResponse = new Service.SendResponseService(res);
    const nextFunction = new Service.NextFunctionService(next);

    return {
      getPathParams,
      getQueryParams,
      setResponseStatus,
      sendResponse,
      nextFunction,
    };
  };
}
