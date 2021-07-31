import { IController } from "presentation/interface/controller/controller";
import { RequestParams } from "presentation/interface/route-registrar/request-params";

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
