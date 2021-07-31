import { NextFunction } from "express";
import * as IMiddleware from "presentation/interface/controller/modules/middleware-service";

export class NextFunctionService implements IMiddleware.INextFunction {
  public constructor(private readonly next: NextFunction) {}

  public execute = (error?: unknown): void => {
    if (error) {
      this.next(error);
    } else {
      this.next();
    }
  };
}
