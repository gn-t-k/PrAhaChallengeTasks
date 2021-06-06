import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { MemberService } from "domain/member/member-service";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { ProgressService } from "domain/progress/progress-service";

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
  private readonly memberService: MemberService;
  private readonly progressService: ProgressService;

  constructor(props: IRegisterMemberProps) {
    this.memberRepository = props.memberRepository;
    this.exerciseRepository = props.exerciseRepository;
    this.progressRepository = props.progressRepository;
    this.memberService = new MemberService(props.memberRepository);
    this.progressService = new ProgressService(props.progressRepository);
  }

  public async execute(props: IExecuteProps): Promise<void> {
    const { name, email } = props;
    const member = MemberService.factory({ name, email });

    await Promise.all([
      this.checkMemberExist(member),
      this.checkProgressExist(member),
    ]);

    const exerciseList = await this.exerciseRepository.getAll();
    const progressList = ProgressService.factory(member, exerciseList);

    await Promise.all([
      this.progressRepository.register(progressList),
      this.memberRepository.register(member),
    ]);
  }

  private async checkMemberExist(member: Member): Promise<void> {
    const isMemberExist = await this.memberService.isExist(member);

    if (isMemberExist) {
      throw new Error("Member already exists");
    }
  }

  private async checkProgressExist(member: Member): Promise<void> {
    const isProgressExist = await this.progressService.isExist(member);

    if (isProgressExist) {
      throw new Error("Progress already exists");
    }
  }
}
