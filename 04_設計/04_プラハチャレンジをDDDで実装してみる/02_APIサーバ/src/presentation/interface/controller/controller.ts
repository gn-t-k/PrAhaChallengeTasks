import * as IMiddleware from "presentation/interface/controller/modules/middleware-service";
import * as IRequest from "presentation/interface/controller/modules/request-service";
import * as IResponse from "presentation/interface/controller/modules/response-service";

export interface IController {
  execute: (props: ExecuteProps) => Promise<void>;
}

export type ExecuteProps = {
  requestServices: RequestServices;
  responseServices: ResponseServices;
  middlewareServices: MiddlewareServices;
};

type RequestServices = {
  getPathParams: IRequest.IGetPathParams;
  getQueryParams: IRequest.IGetQueryParams;
  getRequestBody: IRequest.IGetRequstBody;
};

type ResponseServices = {
  setResponseStatus: IResponse.ISetResponseStatus;
  sendResponse: IResponse.ISendResponse;
};

type MiddlewareServices = {
  nextFunction: IMiddleware.INextFunction;
};
