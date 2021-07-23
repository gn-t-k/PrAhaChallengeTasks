export interface IController {
  execute: (
    requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ) => Promise<void>;
}

export type RequestServices = {
  getPathParams: IGetPathParams;
  getQueryParams: IGetQueryParams;
  getRequestBody: IGetRequstBody;
};

export type ResponseServices = {
  setResponseStatus: ISetResponseStatus;
  sendResponse: ISendResponse;
};

export type MiddlewareServices = {
  nextFunction: INextFunction;
};

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
