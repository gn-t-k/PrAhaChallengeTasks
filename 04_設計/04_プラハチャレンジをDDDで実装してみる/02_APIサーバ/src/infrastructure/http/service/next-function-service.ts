import { NextFunction } from "express";
import { INextFunction } from "controller/interface/http-client-interface";

export class NextFunctionService implements INextFunction {
  public constructor(private readonly next: NextFunction) {}

  public execute = (): void => {
    this.next();
  };
}
