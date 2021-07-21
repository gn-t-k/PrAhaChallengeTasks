import * as Controller from "presentation/controller";
import { IClient } from "presentation/interface/http-client-interface";

export class MemberRegistrar {
  public constructor(
    private readonly client: IClient,
    private readonly getAllMemberController: Controller.Member.GetAllMemberController,
    private readonly getMemberByPairNameController: Controller.Member.GetMemberByPairNameController,
    private readonly getMemberByTeamNameController: Controller.Member.GetMemberByTeamNameController,
    private readonly getMemberByExerciseAndProgressController: Controller.Member.GetMemberByExerciseAndProgressController,
    private readonly registerMemberController: Controller.Member.RegisterMemberController,
    private readonly changeActivityStatusController: Controller.Member.ChangeActivityStatusController,
    private readonly changeProgressStatusToNextController: Controller.Member.ChangeProgressStatusToNextController,
    private readonly changeProgressStatusToPreviousController: Controller.Member.ChangeProgressStatusToPreviousController,
    private readonly deleteMemberController: Controller.Member.DeleteMemberController,
  ) {}

  public register = (): void => {
    this.client.registerGetRoute(
      { path: "/member" },
      this.getAllMemberController,
    );
    this.client.registerGetRoute(
      { path: "/member", query: ["team-name", "pair-name"] },
      this.getMemberByPairNameController,
    );
    this.client.registerGetRoute(
      { path: "/member", query: ["team-name"] },
      this.getMemberByTeamNameController,
    );
    this.client.registerGetRoute(
      { path: "/member", query: ["exercise-id", "progress-status"] },
      this.getMemberByExerciseAndProgressController,
    );
    this.client.registerPostRoute(
      { path: "/member" },
      this.registerMemberController,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/status" },
      this.changeActivityStatusController,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/exercise/:exerciseID/status/next" },
      this.changeProgressStatusToNextController,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/exercise/:exerciseID/status/previous" },
      this.changeProgressStatusToPreviousController,
    );
    this.client.registerDeleteRoute(
      { path: "/member/:memberID" },
      this.deleteMemberController,
    );
  };
}
