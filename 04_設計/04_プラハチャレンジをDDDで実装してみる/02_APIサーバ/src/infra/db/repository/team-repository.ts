import {
  Member as MemberData,
  MemberOnPair as MemberOnPairData,
  Pair as PairData,
  Team as TeamData,
  PrismaClient,
} from "@prisma/client";
import { MemberFactory } from "domain/member/service/member-factory";
import { PairFactory } from "domain/team/domain-service/pair-factory";
import { TeamFactory } from "domain/team/domain-service/team-factory";
import { Team } from "domain/team/entity/team";
import {
  ITeamRepository,
  IGetTeamByPairID,
  IGetTeamByID,
  IGetTeamByMemberID,
} from "domain/team/team-repository-interface";
import { Context } from "infra/db/context";

type NestedTeamData = TeamData & {
  pair: NestedPairData[];
};
type NestedPairData = PairData & {
  member: MemberOnPairData[];
};

export class TeamRepository implements ITeamRepository {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public getByID = async (props: IGetTeamByID): Promise<Team | null> => {
    const nestedTeamData = await this.getNestedTeamData(props.id.value);

    if (nestedTeamData === null) {
      return null;
    }

    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public getByPairID = async (
    props: IGetTeamByPairID,
  ): Promise<Team | null> => {
    const nestedTeamData = await this.getNestedTeamDataByPairID(
      props.pairID.value,
    );

    if (nestedTeamData === null) {
      return null;
    }

    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public getByMemberID = async (
    props: IGetTeamByMemberID,
  ): Promise<Team | null> => {
    const nestedTeamData = await this.getNestedTeamDataByMemberID(
      props.memberID.value,
    );

    if (nestedTeamData === null) {
      return null;
    }

    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public update = async (newTeam: Team): Promise<void> => {
    const currentTeam = await this.getByID({ id: newTeam.id });

    if (currentTeam === null) {
      throw new Error("Team not exists");
    }

    await this.updateTeam(newTeam, currentTeam);
    await this.updatePair(newTeam, currentTeam);
    await this.updateMemberOnPair(newTeam, currentTeam);
  };

  private getTeam = async (nestedTeamData: NestedTeamData): Promise<Team> => {
    const memberDataList = await this.getMemberDataList(nestedTeamData);
    const pairList = TeamRepository.makePairList(
      nestedTeamData,
      memberDataList,
    );
    const { id, name } = nestedTeamData;

    return TeamFactory.execute({
      id,
      name,
      pairList,
    });
  };

  private getNestedTeamData = async (
    id: string,
  ): Promise<NestedTeamData | null> => {
    const nestedTeamData = await this.prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        pair: {
          include: {
            member: true,
          },
        },
      },
    });

    return nestedTeamData;
  };

  private getNestedTeamDataByPairID = async (
    pairID: string,
  ): Promise<NestedTeamData | null> => {
    const pairDataForTeamID = await this.prisma.pair.findUnique({
      where: {
        id: pairID,
      },
      select: {
        teamId: true,
      },
    });

    if (pairDataForTeamID === null) {
      return null;
    }

    const nestedTeamData = await this.getNestedTeamData(
      pairDataForTeamID.teamId,
    );

    return nestedTeamData;
  };

  private getNestedTeamDataByMemberID = async (
    memberID: string,
  ): Promise<NestedTeamData | null> => {
    const memberOnPairData = await this.prisma.memberOnPair.findMany({
      where: {
        memberId: memberID,
      },
    });

    if (
      memberOnPairData.some((mop) => memberOnPairData[0].pairId !== mop.pairId)
    ) {
      throw new Error();
    }

    const pairID = memberOnPairData[0].pairId;

    return this.getNestedTeamDataByPairID(pairID);
  };

  private getMemberDataList = async (nestedTeamData: NestedTeamData) => {
    const memberIDList = nestedTeamData.pair.reduce(
      (memberIDDataList: string[], pairData) =>
        memberIDDataList.concat(pairData.member.map((m) => m.memberId)),
      [],
    );

    const memberDataList = await this.prisma.member.findMany({
      where: {
        id: {
          in: memberIDList,
        },
      },
    });

    return memberDataList;
  };

  private updateTeam = async (
    newTeam: Team,
    currentTeam: Team,
  ): Promise<void> => {
    if (currentTeam.name !== newTeam.name) {
      await this.prisma.team.update({
        where: {
          id: currentTeam.id.value,
        },
        data: {
          name: newTeam.name,
        },
      });
    }
  };

  private updatePair = async (
    newTeam: Team,
    currentTeam: Team,
  ): Promise<void> => {
    const currentPairIDList = currentTeam.pairList.map((pair) => pair.id.value);
    const newPairIDList = newTeam.pairList.map((pair) => pair.id.value);
    const pairIDListDifference = TeamRepository.extractDifference(
      currentPairIDList,
      newPairIDList,
    );

    if (pairIDListDifference.length > 1) {
      throw new Error("Only 1 pair can be added or removed at once");
    }

    if (pairIDListDifference.length === 1) {
      if (newPairIDList.includes(pairIDListDifference[0])) {
        await this.addPair(newTeam, pairIDListDifference[0]);
      } else {
        await this.removePair(currentTeam, pairIDListDifference[0]);
      }
    } else {
      await this.renamePair(newTeam, currentTeam);
    }
  };

  private addPair = async (newTeam: Team, pairID: string): Promise<void> => {
    const addedPair = newTeam.pairList.find((pair) => pair.id.value === pairID);

    if (addedPair === undefined) {
      throw new Error();
    }

    await this.prisma.pair.create({
      data: {
        id: addedPair.id.value,
        name: addedPair.name,
        teamId: newTeam.id.value,
      },
    });
    await Promise.all(
      addedPair.memberList.map((member) =>
        this.prisma.memberOnPair.create({
          data: {
            memberId: member.id.value,
            pairId: addedPair.id.value,
          },
        }),
      ),
    );
  };

  private removePair = async (
    currentTeam: Team,
    pairID: string,
  ): Promise<void> => {
    const removedPair = currentTeam.pairList.find(
      (pair) => pair.id.value === pairID,
    );

    if (removedPair === undefined) {
      throw new Error();
    }

    await this.prisma.memberOnPair.deleteMany({
      where: {
        pairId: removedPair.id.value,
      },
    });
    await this.prisma.pair.delete({
      where: {
        id: removedPair.id.value,
      },
    });
  };

  private renamePair = async (
    newTeam: Team,
    currentTeam: Team,
  ): Promise<void> => {
    const renamedPairList = newTeam.pairList.filter((newPair) => {
      const currentPair = currentTeam.pairList.find((p) => p.equals(newPair));
      if (currentPair === undefined) {
        throw new Error();
      }

      return newPair.name !== currentPair.name;
    });

    await Promise.all(
      renamedPairList.map((pair) =>
        this.prisma.pair.update({
          where: {
            id: pair.id.value,
          },
          data: {
            name: pair.name,
            teamId: newTeam.id.value,
          },
        }),
      ),
    );
  };

  private updateMemberOnPair = async (
    newTeam: Team,
    currentTeam: Team,
  ): Promise<void> => {
    const currentMemberIDList = currentTeam
      .getMemberList()
      .map((m) => m.id.value);
    const newMemberIDList = newTeam.getMemberList().map((m) => m.id.value);
    const memberIDListDifference = TeamRepository.extractDifference(
      currentMemberIDList,
      newMemberIDList,
    );

    if (memberIDListDifference.length > 1) {
      throw new Error("Only 1 member can be added or removed at once");
    }

    if (memberIDListDifference.length === 1) {
      if (newMemberIDList.includes(memberIDListDifference[0])) {
        await this.addMember(newTeam, memberIDListDifference[0]);
      } else {
        await this.removeMember(currentTeam, memberIDListDifference[0]);
      }
    }
  };

  private addMember = async (
    newTeam: Team,
    memberID: string,
  ): Promise<void> => {
    const addedMember = newTeam
      .getMemberList()
      .find((member) => member.id.value === memberID);
    const targetPair = newTeam.pairList.find((pair) =>
      pair.memberList.map((m) => m.id.value).includes(memberID),
    );

    if (addedMember === undefined || targetPair === undefined) {
      throw new Error();
    }

    await this.prisma.memberOnPair.create({
      data: {
        memberId: addedMember.id.value,
        pairId: targetPair.id.value,
      },
    });
  };

  private removeMember = async (currentTeam: Team, memberID: string) => {
    const removedMember = currentTeam
      .getMemberList()
      .find((member) => member.id.value === memberID);
    const targetPair = currentTeam.pairList.find((pair) =>
      pair.memberList.map((m) => m.id.value).includes(memberID),
    );

    if (removedMember === undefined || targetPair === undefined) {
      throw new Error();
    }

    await this.prisma.memberOnPair.delete({
      where: {
        memberId_pairId: {
          memberId: removedMember.id.value,
          pairId: targetPair.id.value,
        },
      },
    });
  };

  private static makePairList = (
    nestedTeamData: NestedTeamData,
    memberDataList: MemberData[],
  ) =>
    nestedTeamData.pair.map((pairData) => {
      const { id, name } = pairData;
      const memberList = pairData.member.map((mop) => {
        const memberData = memberDataList.find((m) => m.id === mop.memberId);

        if (memberData === undefined) {
          // TODO: データ不整合時にしか起こらないエラーのため、ログ出すなどする
          throw new Error("Member not exists");
        }

        return MemberFactory.execute(memberData);
      });

      return PairFactory.execute({ id, name, memberList });
    });

  private static extractDifference = (
    listA: string[],
    listB: string[],
  ): string[] => {
    if (listA.length === listB.length) {
      return listA.filter((a) => listB.every((b) => a !== b));
    }
    const [shorter, longer] =
      listA.length < listB.length ? [listA, listB] : [listB, listA];

    return longer.filter((l) => shorter.every((s) => l !== s));
  };
}
