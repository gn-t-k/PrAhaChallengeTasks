// TODO
/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from "express";
import { ControllerServiceFactory } from "presentation/implementation/express/controller";
import { IController } from "presentation/interface/controller";
import {
  IDeleteRouteRegistrar,
  RequestParams,
} from "presentation/interface/route-registrar";

export class DeleteRouteRegistrar implements IDeleteRouteRegistrar {
  public constructor(private readonly router: Router) {}

  public execute = (
    requestParams: RequestParams,
    controller: IController,
  ): void => {
    this.router.delete(
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
