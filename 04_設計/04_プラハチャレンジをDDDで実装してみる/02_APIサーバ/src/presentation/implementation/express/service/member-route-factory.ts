import { Router } from "express";
import { IsMemberExistService } from "domain/member/service/is-member-exist-service";
import { IsProgressExistService } from "domain/progress/service/is-progress-exist-service";
import { Context } from "infrastructure/db/context";
import * as QueryService from "infrastructure/db/query-service";
import * as Repository from "infrastructure/db/repository";
import * as Controller from "presentation/controller";
import { RouteRegistrarsFactory } from "presentation/implementation/express/service/route-registrars-factory";
import { MemberRoute } from "presentation/route";
import * as Usecase from "usecase";

export class MemberRouteFactory {
  public constructor(
    private readonly router: Router,
    private readonly context: Context,
  ) {}

  public execute = (): MemberRoute => {
    const {
      getRouteRegistrar,
      postRouteRegistrar,
      putRouteRegistrar,
      deleteRouteRegistrar,
    } = new RouteRegistrarsFactory(this.router).execute();

    const getMemberController = this.generateGetMemberController();
    const registerMemberController = this.generateRegisterMemberController();
  };

  private generateGetMemberController = (): Controller.Member.GetMemberController => {
    const getAllMemberQueryService = new QueryService.GetAllMemberQueryService(
      this.context,
    );
    const getAllMemberUsecase = new Usecase.GetAllMember(
      getAllMemberQueryService,
    );

    const getMemberByTeamNameQueryService = new QueryService.GetMemberByTeamNameQueryService(
      this.context,
    );
    const getMemberByTeamNameUsecase = new Usecase.GetMemberByTeamName(
      getMemberByTeamNameQueryService,
    );

    const getMemberByPairNameQueryService = new QueryService.GetMemberByPairNameQueryService(
      this.context,
    );
    const getMemberByPairNameUsecase = new Usecase.GetMemberByPairName(
      getMemberByPairNameQueryService,
    );

    const getMemberByExerciseAndProgressQueryService = new QueryService.GetMemberByExerciseAndProgressQueryService(
      this.context,
    );
    const getMemberByExerciseAndProgressUsecase = new Usecase.GetMemberByExerciseAndProgress(
      getMemberByExerciseAndProgressQueryService,
    );

    return new Controller.Member.GetMemberController(
      getAllMemberUsecase,
      getMemberByTeamNameUsecase,
      getMemberByPairNameUsecase,
      getMemberByExerciseAndProgressUsecase,
    );
  };

  private generateRegisterMemberController = (): Controller.Member.RegisterMemberController => {
    const memberRepository = new Repository.MemberRepository(this.context);
    const exerciseRepository = new Repository.ExerciseRepository(this.context);
    const progressRepository = new Repository.ProgressRepository(this.context);
    const isMemberExistService = new IsMemberExistService(memberRepository);
    const isProgressExistService = new IsProgressExistService(
      progressRepository,
    );

    const registerMemberUsecase = new Usecase.RegisterMember({
      memberRepository,
      exerciseRepository,
      progressRepository,
      isMemberExistService,
      isProgressExistService,
    });

    return new Controller.Member.RegisterMemberController(
      registerMemberUsecase,
    );
  };
}
