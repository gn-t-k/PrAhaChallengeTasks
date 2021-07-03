import { Identifier } from "domain/__shared__/identifier";
import { PairFactory } from "domain/team/service/pair-factory";
import { TeamFactory } from "domain/team/service/team-factory";
import { ITeamRepository } from "domain/team/team-repository-interface";

interface IExecuteProps {
  memberID: string;
  pairID: string;
}
export class RemoveMemberFromPair {
  private readonly teamRepository: ITeamRepository;

  public constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public execute = async (props: IExecuteProps): Promise<void> => {
    const currentTeam = await this.teamRepository.getByPairID({
      pairID: new Identifier(props.pairID),
    });

    if (currentTeam === null) {
      throw new Error("Pair is not exists");
    }

    const replacedPairList = currentTeam.pairList.map((currentPair) =>
      currentPair.memberList.some(
        (member) => member.id.value === props.memberID,
      )
        ? PairFactory.execute({
            id: currentPair.id.value,
            name: currentPair.name,
            memberList: currentPair.memberList.filter(
              (member) => member.id.value !== props.memberID,
            ),
          })
        : currentPair,
    );

    const replacedTeam = TeamFactory.execute({
      id: currentTeam.id.value,
      name: currentTeam.name,
      pairList: replacedPairList,
    });

    await this.teamRepository.update(replacedTeam);
  };
}
