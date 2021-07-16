/* eslint-disable @typescript-eslint/no-floating-promises */
import { NextFunction, Request, Response, Router } from "express";
import { MemberController } from "controller/member-controller";

export class MemberRouteRegisterService {
  public constructor(
    private readonly router: Router,
    private readonly controller: MemberController,
  ) {}

  public execute = (): void => {
    this.router.get(
      "/member",
      (req: Request, res: Response, next: NextFunction) => {
        this.controller.getAllMember(req, res, next);
      },
    );
  };
}
