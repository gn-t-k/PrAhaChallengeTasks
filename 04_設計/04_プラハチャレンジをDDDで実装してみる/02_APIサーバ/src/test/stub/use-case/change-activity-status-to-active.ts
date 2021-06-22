import { Member } from "domain/member/entity/member";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";

const createdAt = new Date();
const updatedAt = new Date();

const inRecessMemberData = {
  id: "a5294443-5945-4a74-aac0-593671ed166b",
  name: "Allison Berge",
  email: "Rosa36@gmail.com",
  activityStatus: "休会中",
  createdAt,
  updatedAt,
};

const id = new Identifier(inRecessMemberData.id);
const { name, email } = inRecessMemberData;
const activityStatus = ActivityStatus.create({
  status: inRecessMemberData.activityStatus,
});

export const inRecessMember = Member.rebuild(id, {
  name,
  email,
  activityStatus,
});
