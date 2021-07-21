export interface IGetPathParams {
  execute: () => { [key: string]: string };
}
export interface IGetQueryParams {
  execute: () => { [key: string]: string };
}

export interface IGetRequstBody {
  execute: () => { [key: string]: unknown };
}

export interface ISetResponseStatus {
  execute: (statusCode: number) => void;
}
export interface ISendResponse {
  execute: (data?: unknown) => void;
}
export interface INextFunction {
  execute: (error?: unknown) => void;
}

export type Services = {
  getPathParams: IGetPathParams;
  getQueryParams: IGetQueryParams;
  getRequestBody: IGetRequstBody;
  setResponseStatus: ISetResponseStatus;
  sendResponse: ISendResponse;
  nextFunction: INextFunction;
};

export interface Controller {
  execute: (
    services: Services,
    params?: { [key: string]: unknown },
  ) => Promise<void>;
}

export type RequestParams = {
  path: string;
  query?: string[];
};

export interface IClient {
  registerGetRoute: (
    requestParams: RequestParams,
    controller: Controller,
  ) => void;
  registerPostRoute: (
    requestParams: RequestParams,
    controller: Controller,
  ) => void;
  registerPutRoute: (
    requestParams: RequestParams,
    controller: Controller,
  ) => void;
  registerDeleteRoute: (
    requestParams: RequestParams,
    controller: Controller,
  ) => void;
}
