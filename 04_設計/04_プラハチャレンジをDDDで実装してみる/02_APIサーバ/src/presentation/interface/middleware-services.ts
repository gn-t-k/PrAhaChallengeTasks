export type MiddlewareServices = {
  nextFunction: INextFunction;
};

export interface INextFunction {
  execute: (error?: unknown) => void;
}
