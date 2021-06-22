import { PrismaClient } from "@prisma/client";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { MemberFactory } from "domain/member/service/member-factory";
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

  public getByID = async (id: Identifier): Promise<Member> => {
    const memberData = await this.prisma.member.findUnique({
      where: {
        id: id.value,
      },
    });

    if (memberData === null) {
      throw new Error("Member not exists");
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
}
