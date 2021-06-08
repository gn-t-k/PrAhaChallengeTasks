import { PrismaClient } from "@prisma/client";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { Context } from "infra/db/context";

export class MemberRepository implements IMemberRepository {
  private readonly prisma: PrismaClient;

  public constructor(context: Context) {
    this.prisma = context.prisma;
  }

  public register = async (member: Member): Promise<void> => {
    const id = member.id.value;
    const { name, email } = member;
    const activityStatus = member.status.value;

    await this.prisma.member.create({
      data: { id, name, email, activityStatus },
    });
  };

  public getAll = async (): Promise<Member[]> => {
    const memberDataList = await this.prisma.member.findMany();

    return memberDataList.map((memberData) => {
      const id = new Identifier(memberData.id);
      const { name, email } = memberData;
      const activityStatus = ActivityStatus.create({
        status: memberData.activityStatus,
      });

      return Member.rebuild(id, { name, email, activityStatus });
    });
  };
}
