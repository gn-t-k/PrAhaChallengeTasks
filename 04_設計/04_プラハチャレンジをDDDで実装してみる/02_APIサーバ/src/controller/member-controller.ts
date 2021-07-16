import { GetAllMemberHandler } from "controller/handler/member/get-all-member-handler";
import { GetMemberByPairNameHandler } from "controller/handler/member/get-member-by-pair-name-handler";
import { IClient } from "controller/http-client-interface";

export class MemberController {
  public constructor(
    private readonly getAllMemberHandler: GetAllMemberHandler,
    private readonly getMemberByPairNameHandler: GetMemberByPairNameHandler,
    private readonly client: IClient,
  ) {}

  public register = (): void => {
    this.client.registerGetRoute({ path: "/member" }, this.getAllMemberHandler);
    this.client.registerGetRoute(
      { path: "/member", query: ["pairName"] },
      this.getMemberByPairNameHandler,
    );
  };
}
