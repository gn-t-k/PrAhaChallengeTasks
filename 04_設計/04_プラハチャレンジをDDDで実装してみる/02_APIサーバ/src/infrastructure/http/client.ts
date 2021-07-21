/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from "express";
import * as Service from "infrastructure/http/service";
import {
  Controller,
  IClient,
  RequestParams,
  Services,
} from "presentation/interface/http-client-interface";

export class Client implements IClient {
  public constructor(private readonly router: Router) {}

  public registerGetRoute = (
    requestParams: RequestParams,
    controller: Controller,
  ): void => {
    this.router.get(
      requestParams.path,
      async (req: Request, res: Response, next: NextFunction) => {
        const services = this.getServices(req, res, next);

        await controller.execute(services);
      },
    );
  };

  public registerPostRoute = (
    requestParams: RequestParams,
    controller: Controller,
  ): void => {
    this.router.post(
      requestParams.path,
      async (req: Request, res: Response, next: NextFunction) => {
        const services = this.getServices(req, res, next);

        await controller.execute(services);
      },
    );
  };

  public registerPutRoute = (
    requestParams: RequestParams,
    controller: Controller,
  ): void => {
    this.router.put(
      requestParams.path,
      async (req: Request, res: Response, next: NextFunction) => {
        const services = this.getServices(req, res, next);

        await controller.execute(services);
      },
    );
  };

  public registerDeleteRoute = (
    requestParams: RequestParams,
    handler: Controller,
  ): void => {
    this.router.delete(
      requestParams.path,
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
    const getRequestBody = new Service.GetRequestBody(req);
    const setResponseStatus = new Service.SetResponseStatusService(res);
    const sendResponse = new Service.SendResponseService(res);
    const nextFunction = new Service.NextFunctionService(next);

    return {
      getPathParams,
      getQueryParams,
      getRequestBody,
      setResponseStatus,
      sendResponse,
      nextFunction,
    };
  };
}
