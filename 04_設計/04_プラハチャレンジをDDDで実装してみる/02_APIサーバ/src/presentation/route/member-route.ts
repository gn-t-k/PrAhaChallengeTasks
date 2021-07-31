import * as Controller from "presentation/controller";
import {
  IDeleteRouteRegistrar,
  IGetRouteRegistrar,
  IPostRouteRegistrar,
  IPutRouteRegistrar,
} from "presentation/interface/route-registrar/route-registrar";

export class MemberRoute {
  public constructor(
    private readonly getRouteRegistrar: IGetRouteRegistrar,
    private readonly postRouteRegistrar: IPostRouteRegistrar,
    private readonly putRouteRegistrar: IPutRouteRegistrar,
    private readonly deleteRouteRegistrar: IDeleteRouteRegistrar,
    private readonly getMemberController: Controller.Member.GetMemberController,
    private readonly registerMemberController: Controller.Member.RegisterMemberController,
    private readonly changeActivityStatusController: Controller.Member.ChangeActivityStatusController,
    private readonly changeProgressStatusToNextController: Controller.Member.ChangeProgressStatusToNextController,
    private readonly changeProgressStatusToPreviousController: Controller.Member.ChangeProgressStatusToPreviousController,
    private readonly deleteMemberController: Controller.Member.DeleteMemberController,
  ) {}

  public register = (): void => {
    this.getRouteRegistrar.execute(
      { path: "/members" },
      this.getMemberController,
    );
    this.postRouteRegistrar.execute(
      { path: "/members" },
      this.registerMemberController,
    );
    this.putRouteRegistrar.execute(
      { path: "/members/:memberID/status" },
      this.changeActivityStatusController,
    );
    this.putRouteRegistrar.execute(
      { path: "/members/:memberID/exercises/:exerciseID/status/next" },
      this.changeProgressStatusToNextController,
    );
    this.putRouteRegistrar.execute(
      { path: "/members/:memberID/exercises/:exerciseID/status/previous" },
      this.changeProgressStatusToPreviousController,
    );
    this.deleteRouteRegistrar.execute(
      { path: "/members/:memberID" },
      this.deleteMemberController,
    );
  };
}
