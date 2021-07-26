import { NextFunction, Request, Response } from "express";
import * as Controller from "presentation/implementation/express/controller";
import { MiddlewareServices } from "presentation/interface/middleware-services";
import { RequestServices } from "presentation/interface/request-services";
import { ResponseServices } from "presentation/interface/response-services";

type Return = {
  requestServices: RequestServices;
  responseServices: ResponseServices;
  middlewareServices: MiddlewareServices;
};

export class ControllerServiceFactory {
  public static execute = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Return => {
    const requestServices: RequestServices = {
      getPathParams: new Controller.Modules.RequestService.GetPathParamsService(
        req,
      ),
      getQueryParams: new Controller.Modules.RequestService.GetQueryParamsService(
        req,
      ),
      getRequestBody: new Controller.Modules.RequestService.GetRequestBody(req),
    };
    const responseServices: ResponseServices = {
      setResponseStatus: new Controller.Modules.ResponseService.SetResponseStatusService(
        res,
      ),
      sendResponse: new Controller.Modules.ResponseService.SendResponseService(
        res,
      ),
    };
    const middlewareServices: MiddlewareServices = {
      nextFunction: new Controller.Modules.MiddlewareService.NextFunctionService(
        next,
      ),
    };

    return {
      requestServices,
      responseServices,
      middlewareServices,
    };
  };
}
