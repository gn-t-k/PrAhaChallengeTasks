import { Identifier } from "domain/shared/identifier";
import { Pair } from "domain/team/entity/pair";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class AddMemberToPair {
  private readonly teamRepository: ITeamRepository;

  public constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public execute = async (memberID: string, pairID: string): Promise<void> => {
    const targetTeam = await this.teamRepository.get({ pairID });
    const replacedPairList = targetTeam.pairList.map((pair) => {
      if (pair.id.value !== pairID) return pair;

      return Pair.rebuild(new Identifier(pairID), {
        name: pair.name,
        memberList: pair.memberList
          .concat
          // TODO: 参加者リポジトリから参加者とってきてつっこむ
          (),
      });
    });
    // TODO: replacedPairListをいれたTeamを作る
    const replacedTeam;

    await this.teamRepository.save(replacedTeam);
  };
}
