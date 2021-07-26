export type RequestServices = {
  getPathParams: IGetPathParams;
  getQueryParams: IGetQueryParams;
  getRequestBody: IGetRequstBody;
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
