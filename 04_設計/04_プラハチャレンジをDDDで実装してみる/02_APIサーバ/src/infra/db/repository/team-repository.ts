import { PrismaClient } from "@prisma/client";
import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";

const prisma = new PrismaClient();

export class TeamRepository implements ITeamRepository {
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<ITeamStructure> {
    const memberList = await prisma.team.findMany({
      include: { pair: { include: { member: true } } },
    });
    console.log(memberList);

    return Promise.resolve({ teamList: [], independentMemberList: [] });
  }
}
