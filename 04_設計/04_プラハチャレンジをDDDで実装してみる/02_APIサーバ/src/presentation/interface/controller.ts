import { MiddlewareServices } from "presentation/interface/middleware-services";
import { RequestServices } from "presentation/interface/request-services";
import { ResponseServices } from "presentation/interface/response-services";

export interface IController {
  execute: (
    requestServices: RequestServices,
    responseServices: ResponseServices,
    middleWareServices: MiddlewareServices,
  ) => Promise<void>;
}
