import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { IsMemberExist } from "domain/member/service/is-member-exist";
import { MemberFactory } from "domain/member/service/member-factory";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { IsProgressExist } from "domain/progress/service/is-progress-exist";
import { ProgressFactory } from "domain/progress/service/progress-factory";

interface IRegisterMemberProps {
  memberRepository: IMemberRepository;
  exerciseRepository: IExerciseRepository;
  progressRepository: IProgressRepository;
}

interface IExecuteProps {
  name: string;
  email: string;
}

export class RegisterMember {
  private readonly memberRepository: IMemberRepository;
  private readonly exerciseRepository: IExerciseRepository;
  private readonly progressRepository: IProgressRepository;

  constructor(props: IRegisterMemberProps) {
    this.memberRepository = props.memberRepository;
    this.exerciseRepository = props.exerciseRepository;
    this.progressRepository = props.progressRepository;
  }

  public async execute(props: IExecuteProps): Promise<void> {
    const { name, email } = props;
    const member = MemberFactory.execute({ name, email });

    await Promise.all([
      this.checkMemberExist(member),
      this.checkProgressExist(member),
    ]);

    const exerciseList = await this.exerciseRepository.getAll();
    const progressList = ProgressFactory.execute({ member, exerciseList });

    await Promise.all([
      this.progressRepository.register(progressList),
      this.memberRepository.register(member),
    ]);
  }

  private async checkMemberExist(member: Member): Promise<void> {
    const isMemberExist = await new IsMemberExist(
      this.memberRepository,
    ).execute(member);

    if (isMemberExist) {
      throw new Error("Member already exists");
    }
  }

  private async checkProgressExist(member: Member): Promise<void> {
    const isProgressExist = await new IsProgressExist(
      this.progressRepository,
    ).execute(member);

    if (isProgressExist) {
      throw new Error("Progress already exists");
    }
  }
}
