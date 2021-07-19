import * as Handler from "controller/handler";
import { IClient } from "controller/interface/http-client-interface";

export class MemberController {
  public constructor(
    private readonly getAllMemberHandler: Handler.Member.GetAllMemberHandler,
    private readonly getMemberByPairNameHandler: Handler.Member.GetMemberByPairNameHandler,
    private readonly getMemberByTeamNameHandler: Handler.Member.GetMemberByTeamNameHandler,
    private readonly getMemberByExerciseAndProgressHandler: Handler.Member.GetMemberByExerciseAndProgressHandler,
    private readonly registerMemberHandler: Handler.Member.RegisterMemberHandler,
    private readonly changeActivityStatusHandler: Handler.Member.ChangeActivityStatusHandler,
    private readonly changeProgressStatusToNextHandler: Handler.Member.ChangeProgressStatusToNextHandler,
    private readonly changeProgressStatusToPreviousHandler: Handler.Member.ChangeProgressStatusToPreviousHandler,
    private readonly deleteMemberHandler: Handler.Member.DeleteMemberHandler,
    private readonly client: IClient,
  ) {}

  public register = (): void => {
    this.client.registerGetRoute({ path: "/member" }, this.getAllMemberHandler);
    this.client.registerGetRoute(
      { path: "/member", query: ["team-name", "pair-name"] },
      this.getMemberByPairNameHandler,
    );
    this.client.registerGetRoute(
      { path: "/member", query: ["team-name"] },
      this.getMemberByTeamNameHandler,
    );
    this.client.registerGetRoute(
      { path: "/member", query: ["exercise-id", "progress-status"] },
      this.getMemberByExerciseAndProgressHandler,
    );
    this.client.registerPostRoute(
      { path: "/member" },
      this.registerMemberHandler,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/status" },
      this.changeActivityStatusHandler,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/exercise/:exerciseID/status/next" },
      this.changeProgressStatusToNextHandler,
    );
    this.client.registerPutRoute(
      { path: "/member/:memberID/exercise/:exerciseID/status/previous" },
      this.changeProgressStatusToPreviousHandler,
    );
    this.client.registerDeleteRoute(
      { path: "/member/:memberID" },
      this.deleteMemberHandler,
    );
  };
}
