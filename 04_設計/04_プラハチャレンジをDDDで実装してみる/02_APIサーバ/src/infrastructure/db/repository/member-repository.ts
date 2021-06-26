import { PrismaClient } from "@prisma/client";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { MemberFactory } from "domain/member/service/member-factory";
import { Identifier } from "domain/__shared__/identifier";
import { Context } from "infrastructure/db/context";

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

  public getByID = async (id: Identifier): Promise<Member | null> => {
    const memberData = await this.prisma.member.findUnique({
      where: {
        id: id.value,
      },
    });

    if (memberData === null) {
      return null;
    }

    return MemberFactory.execute(memberData);
  };

  public getAll = async (): Promise<Member[]> => {
    const memberDataList = await this.prisma.member.findMany();

    return memberDataList.map((memberData) =>
      MemberFactory.execute(memberData),
    );
  };

  public update = async (member: Member): Promise<void> => {
    const id = member.id.value;
    const { name, email } = member;
    const activityStatus = member.status.value;

    await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        activityStatus,
      },
    });
  };

  public delete = async (member: Member): Promise<void> => {
    const id = member.id.value;

    await this.prisma.exerciseOnMember.deleteMany({
      where: {
        memberId: id,
      },
    });

    await this.prisma.member.delete({
      where: {
        id,
      },
    });
  };
}
