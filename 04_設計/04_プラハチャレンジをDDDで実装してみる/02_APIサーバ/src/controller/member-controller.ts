import { NextFunction, Request, Response } from "express";
import * as Usecase from "usecase";

export class MemberController {
  public constructor(
    private readonly getAllMemberUsecase: Usecase.GetAllMember,
    private readonly getMemberByPairNameUsecase: Usecase.GetMemberByPairName,
    private readonly getMemberByTeamNameUsecase: Usecase.GetMemberByTeamName,
    private readonly getMemberByExerciseAndProgressUsecase: Usecase.GetMemberByExerciseAndProgress,
    private readonly registerMemberUsecase: Usecase.RegisterMember,
    private readonly changeActivityStatusToActiveUsecase: Usecase.ChangeActivityStatusToActive,
    private readonly changeActivityStatusToInRecessUsecase: Usecase.ChangeActivityStatusToInRecess,
    private readonly changeActivityStatusToLeftUsecase: Usecase.ChangeActivityStatusToLeft,
    private readonly changeProgressStatusToNextUsecase: Usecase.ChangeProgressStatusNext,
    private readonly changeProgressStatusToPreviousUsecase: Usecase.ChangeProgressStatusPrevious,
    private readonly deleteMemberUsecase: Usecase.DeleteMember,
  ) {}

  public getAllMember = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getAllMemberUsecase.execute();
      res.json(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    } finally {
      next();
    }
  };
}
