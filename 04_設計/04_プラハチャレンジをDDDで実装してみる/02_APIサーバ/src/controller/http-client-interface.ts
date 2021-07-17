export interface IGetPathParams {
  execute: () => { [key: string]: string };
}
export interface IGetQueryParams {
  execute: () => { [key: string]: string };
}
export interface ISetResponseStatus {
  execute: (statusCode: number) => void;
}
export interface ISendResponse {
  execute: (data: unknown) => void;
}
export interface INextFunction {
  execute: (error?: unknown) => void;
}

export type Services = {
  getPathParams: IGetPathParams;
  getQueryParams: IGetQueryParams;
  setResponseStatus: ISetResponseStatus;
  sendResponse: ISendResponse;
  nextFunction: INextFunction;
};

export interface Handler {
  execute: (
    services: Services,
    params?: { [key: string]: unknown },
  ) => Promise<void>;
}

export type PathAndQuery = {
  path: string;
  query?: string[];
};

export interface IClient {
  registerGetRoute: (pathAndQuery: PathAndQuery, handler: Handler) => void;
}
