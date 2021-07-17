import * as Handler from "controller/handler";
import { IClient } from "controller/http-client-interface";

export class MemberController {
  public constructor(
    private readonly getAllMemberHandler: Handler.Member.GetAllMemberHandler,
    private readonly getMemberByPairNameHandler: Handler.Member.GetMemberByPairNameHandler,
    private readonly getMemberByTeamNameHandler: Handler.Member.GetMemberByTeamNameHandler,
    private readonly getMemberByExerciseAndProgressHandler: Handler.Member.GetMemberByExerciseAndProgressHandler,
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
  };
}
