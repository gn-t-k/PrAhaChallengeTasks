import { Router } from "express";
import { MemberRouteFactory } from "config/initializer/route/member-route-factory";
import { Context } from "infrastructure/db/context";
import * as Route from "presentation/route";

export class RouteInitializer {
  private readonly memberRoute: Route.MemberRoute;

  public constructor(
    private readonly router: Router,
    private readonly context: Context,
  ) {
    this.memberRoute = new MemberRouteFactory(
      this.router,
      this.context,
    ).execute();
  }

  public execute = (): void => {
    this.memberRoute.register();
  };
}
