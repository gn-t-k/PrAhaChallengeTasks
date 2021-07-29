import { Router } from "express";
import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { ChangeActivityStatusService } from "domain/member/service/change-activity-status-service";
import { DeleteMemberService } from "domain/member/service/delete-member-service";
import { IsMemberExistService } from "domain/member/service/is-member-exist-service";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { IsProgressExistService } from "domain/progress/service/is-progress-exist-service";
import { ITeamRepository } from "domain/team/team-repository-interface";
import { Context } from "infrastructure/db/context";
import * as QueryService from "infrastructure/db/query-service";
import * as Repository from "infrastructure/db/repository";
import * as MemberController from "presentation/controller/member";
import { RouteRegistrarsFactory } from "presentation/implementation/express/service/route-registrars-factory";
import { MemberRoute } from "presentation/route";
import * as Usecase from "usecase";

export class MemberRouteFactory {
  private readonly memberRepository: IMemberRepository;
  private readonly exerciseRepository: IExerciseRepository;
  private readonly progressRepository: IProgressRepository;
  private readonly teamRepository: ITeamRepository;

  public constructor(
    private readonly router: Router,
    private readonly context: Context,
  ) {
    this.memberRepository = new Repository.MemberRepository(context);
    this.exerciseRepository = new Repository.ExerciseRepository(context);
    this.progressRepository = new Repository.ProgressRepository(context);
    this.teamRepository = new Repository.TeamRepository(context);
  }

  public execute = (): MemberRoute => {
    const {
      getRouteRegistrar,
      postRouteRegistrar,
      putRouteRegistrar,
      deleteRouteRegistrar,
    } = new RouteRegistrarsFactory(this.router).execute();

    const getMemberController = this.generateGetMemberController();
    const registerMemberController = this.generateRegisterMemberController();
    const changeActivityStatusController = this.generateChangeActivityStatusController();
    const changeProgressStatusToNextController = this.generateChangeProgressStatusToNextController();
    const changeProgressStatusToPreviousController = this.generateChangeProgressStatusToPreviousController();
    const deleteMemberController = this.generateDeleteMemberController();

    return new MemberRoute(
      getRouteRegistrar,
      postRouteRegistrar,
      putRouteRegistrar,
      deleteRouteRegistrar,
      getMemberController,
      registerMemberController,
      changeActivityStatusController,
      changeProgressStatusToNextController,
      changeProgressStatusToPreviousController,
      deleteMemberController,
    );
  };

  private generateGetMemberController = (): MemberController.GetMemberController => {
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

    return new MemberController.GetMemberController(
      getAllMemberUsecase,
      getMemberByTeamNameUsecase,
      getMemberByPairNameUsecase,
      getMemberByExerciseAndProgressUsecase,
    );
  };

  private generateRegisterMemberController = (): MemberController.RegisterMemberController => {
    const isMemberExistService = new IsMemberExistService(
      this.memberRepository,
    );
    const isProgressExistService = new IsProgressExistService(
      this.progressRepository,
    );

    const registerMemberUsecase = new Usecase.RegisterMember({
      memberRepository: this.memberRepository,
      exerciseRepository: this.exerciseRepository,
      progressRepository: this.progressRepository,
      isMemberExistService,
      isProgressExistService,
    });

    return new MemberController.RegisterMemberController(registerMemberUsecase);
  };

  private generateChangeActivityStatusController = (): MemberController.ChangeActivityStatusController => {
    const changeActivityStatusService = new ChangeActivityStatusService(
      this.memberRepository,
      this.teamRepository,
    );
    const changeActivityStatusToActiveUsecase = new Usecase.ChangeActivityStatusToActive(
      this.memberRepository,
      changeActivityStatusService,
    );
    const changeActivityStatusToInRecessUsecase = new Usecase.ChangeActivityStatusToInRecess(
      this.memberRepository,
      changeActivityStatusService,
    );
    const changeActivityStatusToLeftUsecase = new Usecase.ChangeActivityStatusToLeft(
      this.memberRepository,
      changeActivityStatusService,
    );

    return new MemberController.ChangeActivityStatusController(
      changeActivityStatusToActiveUsecase,
      changeActivityStatusToInRecessUsecase,
      changeActivityStatusToLeftUsecase,
    );
  };

  private generateChangeProgressStatusToNextController = (): MemberController.ChangeProgressStatusToNextController => {
    const changeProgressStatusNextUsecase = new Usecase.ChangeProgressStatusNext(
      this.progressRepository,
    );

    return new MemberController.ChangeProgressStatusToNextController(
      changeProgressStatusNextUsecase,
    );
  };

  private generateChangeProgressStatusToPreviousController = (): MemberController.ChangeProgressStatusToPreviousController => {
    const changeProgressStatusPreviousUsecase = new Usecase.ChangeProgressStatusPrevious(
      this.progressRepository,
    );

    return new MemberController.ChangeProgressStatusToPreviousController(
      changeProgressStatusPreviousUsecase,
    );
  };

  private generateDeleteMemberController = (): MemberController.DeleteMemberController => {
    const deleteMemberService = new DeleteMemberService(
      this.memberRepository,
      this.teamRepository,
    );
    const deleteMemberUsecase = new Usecase.DeleteMember(
      this.memberRepository,
      deleteMemberService,
    );

    return new MemberController.DeleteMemberController(deleteMemberUsecase);
  };
}
