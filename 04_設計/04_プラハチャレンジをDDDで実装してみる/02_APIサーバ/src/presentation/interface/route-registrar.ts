import { IController } from "presentation/interface/controller";

export interface IGetRouteRegistrar {
  execute: (requestParams: RequestParams, controller: IController) => void;
}

export interface IPostRouteRegistrar {
  execute: (requestParams: RequestParams, controller: IController) => void;
}

export interface IPutRouteRegistrar {
  execute: (requestParams: RequestParams, controller: IController) => void;
}

export interface IDeleteRouteRegistrar {
  execute: (requestParams: RequestParams, controller: IController) => void;
}

export type RequestParams = {
  path: string;
  query?: string[];
};
