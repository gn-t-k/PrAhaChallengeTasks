import { IExerciseRepository } from "domain/exercise/exercise-repository-interface";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { IsMemberExistService } from "domain/member/service/is-member-exist-service";
import { MemberFactory } from "domain/member/service/member-factory";
import { IProgressRepository } from "domain/progress/progress-repository-interface";
import { IsProgressExistService } from "domain/progress/service/is-progress-exist-service";
import { ProgressFactory } from "domain/progress/service/progress-factory";

interface IRegisterMemberProps {
  memberRepository: IMemberRepository;
  exerciseRepository: IExerciseRepository;
  progressRepository: IProgressRepository;
  isMemberExistService: IsMemberExistService;
  isProgressExistService: IsProgressExistService;
}

interface IExecuteProps {
  name: string;
  email: string;
}

export class RegisterMember {
  private readonly memberRepository: IMemberRepository;
  private readonly exerciseRepository: IExerciseRepository;
  private readonly progressRepository: IProgressRepository;
  private readonly isMemberExistService: IsMemberExistService;
  private readonly isProgressExistService: IsProgressExistService;

  public constructor(props: IRegisterMemberProps) {
    this.memberRepository = props.memberRepository;
    this.exerciseRepository = props.exerciseRepository;
    this.progressRepository = props.progressRepository;
    this.isMemberExistService = props.isMemberExistService;
    this.isProgressExistService = props.isProgressExistService;
  }

  public execute = async (props: IExecuteProps): Promise<void> => {
    const { name, email } = props;
    const member = MemberFactory.execute({ name, email });

    await Promise.all([
      this.validateMember(member),
      this.validateProgress(member),
    ]);

    const exerciseList = await this.exerciseRepository.getAll();
    const progressList = ProgressFactory.execute({ member, exerciseList });

    await Promise.all([
      this.progressRepository.register(progressList),
      this.memberRepository.register(member),
    ]);
  };

  private validateMember = async (member: Member): Promise<void> => {
    const isMemberExist = await this.isMemberExistService.execute(member);

    if (isMemberExist) {
      throw new Error("Member already exists");
    }
  };

  private validateProgress = async (member: Member): Promise<void> => {
    const isProgressExist = await this.isProgressExistService.execute(member);

    if (isProgressExist) {
      throw new Error("Progress already exists");
    }
  };
}
