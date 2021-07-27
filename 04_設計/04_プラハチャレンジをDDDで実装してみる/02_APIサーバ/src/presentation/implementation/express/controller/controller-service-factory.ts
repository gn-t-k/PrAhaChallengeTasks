import { NextFunction, Request, Response } from "express";
import * as Controller from "presentation/implementation/express/controller";
import { ExecuteProps } from "presentation/interface/controller/controller";

export class ControllerServiceFactory {
  public static execute = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): ExecuteProps => {
    const requestServices = {
      getPathParams: new Controller.Modules.RequestService.GetPathParamsService(
        req,
      ),
      getQueryParams: new Controller.Modules.RequestService.GetQueryParamsService(
        req,
      ),
      getRequestBody: new Controller.Modules.RequestService.GetRequestBody(req),
    };
    const responseServices = {
      setResponseStatus: new Controller.Modules.ResponseService.SetResponseStatusService(
        res,
      ),
      sendResponse: new Controller.Modules.ResponseService.SendResponseService(
        res,
      ),
    };
    const middlewareServices = {
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
