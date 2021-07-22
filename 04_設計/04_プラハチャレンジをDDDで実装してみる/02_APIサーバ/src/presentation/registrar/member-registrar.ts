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
      { path: "/members" },
      this.getAllMemberController,
    );
    this.client.registerGetRoute(
      { path: "/members", query: ["team-name", "pair-name"] },
      this.getMemberByPairNameController,
    );
    this.client.registerGetRoute(
      { path: "/members", query: ["team-name"] },
      this.getMemberByTeamNameController,
    );
    this.client.registerGetRoute(
      { path: "/members", query: ["exercise-id", "progress-status"] },
      this.getMemberByExerciseAndProgressController,
    );
    this.client.registerPostRoute(
      { path: "/members" },
      this.registerMemberController,
    );
    this.client.registerPutRoute(
      { path: "/members/:memberID/status" },
      this.changeActivityStatusController,
    );
    this.client.registerPutRoute(
      { path: "/members/:memberID/exercises/:exerciseID/status/next" },
      this.changeProgressStatusToNextController,
    );
    this.client.registerPutRoute(
      { path: "/members/:memberID/exercises/:exerciseID/status/previous" },
      this.changeProgressStatusToPreviousController,
    );
    this.client.registerDeleteRoute(
      { path: "/members/:memberID" },
      this.deleteMemberController,
    );
  };
}
