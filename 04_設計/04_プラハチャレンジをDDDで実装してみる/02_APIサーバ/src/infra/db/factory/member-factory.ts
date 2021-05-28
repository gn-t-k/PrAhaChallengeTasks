import {
  Member as IMemberData,
  MemberOnPair as IMemberOnPairData,
} from "@prisma/client";
import { Identifier } from "domain/shared/identifier";
import { Member } from "domain/team/entity/member";
import { ActivityStatus } from "domain/team/value-object/activity-status";

export const convertMemberDataToEntity = (memberData: IMemberData): Member => {
  const { id, name, email, activityStatus } = memberData;

  return Member.rebuild(new Identifier(id), {
    name,
    email,
    activityStatus: ActivityStatus.create({ status: activityStatus }),
  });
};

export const convertMemberOnPairToMember = (
  memberOnPairList: IMemberOnPairData[],
  allMemberList: Member[],
): Member[] => {
  const memberIdList = memberOnPairList.map(
    (memberOnPair) => memberOnPair.memberId,
  );

  return allMemberList.filter((member) =>
    memberIdList.includes(member.id.value),
  );
};
