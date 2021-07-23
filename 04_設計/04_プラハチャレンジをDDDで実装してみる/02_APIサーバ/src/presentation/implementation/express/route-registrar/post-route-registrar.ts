// TODO
/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from "express";
import { ControllerServiceFactory } from "presentation/implementation/express/controller";
import { IController } from "presentation/interface/controller";
import {
  IPostRouteRegistrar,
  RequestParams,
} from "presentation/interface/route-registrar";

export class PostRouteRegistrar implements IPostRouteRegistrar {
  public constructor(private readonly router: Router) {}

  public execute = (
    requestParams: RequestParams,
    controller: IController,
  ): void => {
    this.router.post(
      requestParams.path,
      async (req: Request, res: Response, next: NextFunction) => {
        const {
          requestServices,
          responseServices,
          middlewareServices,
        } = ControllerServiceFactory.execute(req, res, next);

        await controller.execute(
          requestServices,
          responseServices,
          middlewareServices,
        );
      },
    );
  };
}
