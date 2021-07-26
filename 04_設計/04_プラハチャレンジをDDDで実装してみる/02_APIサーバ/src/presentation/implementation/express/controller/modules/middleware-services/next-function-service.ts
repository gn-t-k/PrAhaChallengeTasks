import { NextFunction } from "express";
import { INextFunction } from "presentation/interface/middleware-services";

export class NextFunctionService implements INextFunction {
  public constructor(private readonly next: NextFunction) {}

  public execute = (error?: unknown): void => {
    if (error) {
      this.next(error);
    } else {
      this.next();
    }
  };
}
