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

  public getByID = async (props: IGetTeamByID): Promise<Team> => {
    const nestedTeamData = await this.getNestedTeamData(props.id);
    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public getByPairID = async (props: IGetTeamByPairID): Promise<Team> => {
    const nestedTeamData = await this.getNestedTeamDataByPairID(props.pairID);
    const team = await this.getTeam(nestedTeamData);

    return team;
  };

  public save = async (team: Team): Promise<void> => {
    const currentTeam = await this.getByID({ id: team.id.value });

    /**
     * teamのテーブルへの書き込み
     */
    if (currentTeam.name !== team.name) {
      await this.prisma.team.update({
        where: {
          id: team.id.value,
        },
        data: {
          name: team.name,
        },
      });
    }

    /**
     * pairテーブルへの書き込み
     */
    const currentPairIDList = currentTeam.pairList.map((pair) => pair.id.value);
    const newPairIDList = team.pairList.map((pair) => pair.id.value);
    const pairIDListDifference = ((
      idListA: string[],
      idListB: string[],
    ): string[] => {
      if (idListA.length === idListB.length) {
        return idListA.filter((a) => idListB.every((b) => a !== b));
      }
      const [shorter, longer] =
        idListA.length < idListB.length
          ? [idListA, idListB]
          : [idListB, idListA];

      return longer.filter((l) => shorter.every((s) => l !== s));
    })(currentPairIDList, newPairIDList);

    if (pairIDListDifference.length > 1) {
      throw new Error("Only 1 pair can be added or removed at once");
    }

    if (pairIDListDifference.length === 1) {
      /**
       * pairの追加/削除
       */
      if (newPairIDList.includes(pairIDListDifference[0])) {
        // ペアの追加
        const addedPair = team.pairList.find(
          (pair) => pair.id.value === pairIDListDifference[0],
        );

        if (addedPair === undefined) {
          throw new Error();
        }

        await this.prisma.pair.create({
          data: {
            id: addedPair.id.value,
            name: addedPair.name,
            teamId: team.id.value,
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
      } else {
        // ペアの削除
        const removedPair = currentTeam.pairList.find(
          (pair) => pair.id.value === pairIDListDifference[0],
        );

        if (removedPair === undefined) {
          throw new Error();
        }

        await this.prisma.pair.delete({
          where: {
            id: removedPair.id.value,
          },
        });
        await this.prisma.memberOnPair.deleteMany({
          where: {
            pairId: removedPair.id.value,
          },
        });
      }
    } else {
      /**
       * pairのnameの更新
       */
      const renamedPairList = team.pairList.filter((newPair) => {
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
              teamId: team.id.value,
            },
          }),
        ),
      );
    }

    /**
     * 参加者の追加/削除
     */
    const currentMemberIDList = currentTeam
      .getMemberList()
      .map((m) => m.id.value);
    const newMemberIDList = team.getMemberList().map((m) => m.id.value);
    const memberIDListDifference = ((
      idListA: string[],
      idListB: string[],
    ): string[] => {
      if (idListA.length === idListB.length) {
        return idListA.filter((a) => idListB.every((b) => a !== b));
      }
      const [shorter, longer] =
        idListA.length < idListB.length
          ? [idListA, idListB]
          : [idListB, idListA];

      return longer.filter((l) => shorter.every((s) => l !== s));
    })(currentMemberIDList, newMemberIDList);

    if (memberIDListDifference.length > 1) {
      throw new Error("Only 1 member can be added or removed at once");
    }

    if (memberIDListDifference.length === 1) {
      if (newMemberIDList.includes(memberIDListDifference[0])) {
        // 参加者の追加
        const addedMember = team
          .getMemberList()
          .find((member) => member.id.value === memberIDListDifference[0]);
        const targetPair = team.pairList.find((pair) =>
          pair.memberList
            .map((m) => m.id.value)
            .includes(memberIDListDifference[0]),
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
      } else {
        // 参加者の削除
        const removedMember = currentTeam
          .getMemberList()
          .find((member) => member.id.value === memberIDListDifference[0]);
        const targetPair = currentTeam.pairList.find((pair) =>
          pair.memberList
            .map((m) => m.id.value)
            .includes(memberIDListDifference[0]),
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
      }
    }
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

  private getNestedTeamData = async (id: string) => {
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

    if (nestedTeamData === null) {
      throw new Error("Team not exists");
    }

    return nestedTeamData;
  };

  private getNestedTeamDataByPairID = async (pairID: string) => {
    const pairDataForTeamID = await this.prisma.pair.findUnique({
      where: {
        id: pairID,
      },
      select: {
        teamId: true,
      },
    });

    if (pairDataForTeamID === null) {
      throw new Error("Pair not exists");
    }

    const nestedTeamData = await this.getNestedTeamData(
      pairDataForTeamID.teamId,
    );

    return nestedTeamData;
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
}
