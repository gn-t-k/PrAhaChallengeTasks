import { MemberFactory } from "domain/member/service/member-factory";
import { PairFactory } from "domain/team/domain-service/pair-factory";
import { TeamFactory } from "domain/team/domain-service/team-factory";

const createdAt = new Date();
const updatedAt = new Date();

const nestedTeamData = {
  id: "0a3fc828-dc70-49c8-9690-0ed78e212055",
  name: "1",
  createdAt,
  updatedAt,
  pair: [
    {
      id: "9da36d6e-c4a2-4215-bfb1-fa62acebd725",
      name: "a",
      teamId: "0a3fc828-dc70-49c8-9690-0ed78e212055",
      createdAt,
      updatedAt,
      member: [
        {
          memberId: "bde2a250-f30d-4b80-90cd-ba2387e2b90f",
          pairId: "9da36d6e-c4a2-4215-bfb1-fa62acebd725",
          createdAt,
          updatedAt,
        },
        {
          memberId: "4f19e241-baaa-4e59-8ae7-63f1d52cece2",
          pairId: "9da36d6e-c4a2-4215-bfb1-fa62acebd725",
          createdAt,
          updatedAt,
        },
      ],
    },
    {
      id: "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
      name: "b",
      teamId: "0a3fc828-dc70-49c8-9690-0ed78e212055",
      createdAt,
      updatedAt,
      member: [
        {
          memberId: "e6744e62-0f74-4b13-bcb3-d09cb20fe551",
          pairId: "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
          createdAt,
          updatedAt,
        },
        {
          memberId: "4b475b13-4bfa-498e-9ae8-cec321d8ddd3",
          pairId: "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
          createdAt,
          updatedAt,
        },
        {
          memberId: "9d553bbf-1840-49bf-8d4a-9c9deb39b31e",
          pairId: "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
          createdAt,
          updatedAt,
        },
      ],
    },
  ],
};

const memberDataList = [
  {
    id: "bde2a250-f30d-4b80-90cd-ba2387e2b90f",
    name: "Doug Bahringer",
    email: "Katelyn_Kshlerin@gmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
  },
  {
    id: "4f19e241-baaa-4e59-8ae7-63f1d52cece2",
    name: "Brittany Ortiz",
    email: "Beau_Boyle4@gmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
  },
  {
    id: "e6744e62-0f74-4b13-bcb3-d09cb20fe551",
    name: "Yvette Beahan",
    email: "Pamela69@gmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
  },
  {
    id: "4b475b13-4bfa-498e-9ae8-cec321d8ddd3",
    name: "Amanda Reilly MD",
    email: "Cordie.Beahan@hotmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
  },
  {
    id: "9d553bbf-1840-49bf-8d4a-9c9deb39b31e",
    name: "Dr. Stanley Wilderman",
    email: "Leo.Corwin44@gmail.com",
    activityStatus: "在籍中",
    createdAt,
    updatedAt,
  },
];

const { id: teamId, name: teamName } = nestedTeamData;
const pairList = nestedTeamData.pair.map((pairData) => {
  const memberIDList = pairData.member.map((m) => m.memberId);
  const memberList = memberDataList
    .filter((memberData) => memberIDList.includes(memberData.id))
    .map((memberData) =>
      MemberFactory.execute({
        id: memberData.id,
        name: memberData.name,
        email: memberData.email,
        activityStatus: memberData.activityStatus,
      }),
    );

  return PairFactory.execute({
    id: pairData.id,
    name: pairData.name,
    memberList,
  });
});

export const team = TeamFactory.execute({
  id: teamId,
  name: teamName,
  pairList,
});

const memberData = {
  id: "a5294443-5945-4a74-aac0-593671ed166b",
  name: "Allison Berge",
  email: "Rosa36@gmail.com",
  activityStatus: "在籍中",
  createdAt,
  updatedAt,
};

const { id: memberId, name: memberName, email, activityStatus } = memberData;
export const member = MemberFactory.execute({
  id: memberId,
  name: memberName,
  email,
  activityStatus,
});

const expectedPairList = [
  PairFactory.execute({
    id: nestedTeamData.pair[0].id,
    name: nestedTeamData.pair[0].name,
    memberList: [
      MemberFactory.execute({
        id: memberDataList[0].id,
        name: memberDataList[0].name,
        email: memberDataList[0].email,
        activityStatus: memberDataList[0].activityStatus,
      }),
      MemberFactory.execute({
        id: memberDataList[1].id,
        name: memberDataList[1].name,
        email: memberDataList[1].email,
        activityStatus: memberDataList[1].activityStatus,
      }),
      MemberFactory.execute({
        id: memberData.id,
        name: memberData.name,
        email: memberData.email,
        activityStatus: memberData.activityStatus,
      }),
    ],
  }),
  PairFactory.execute({
    id: nestedTeamData.pair[1].id,
    name: nestedTeamData.pair[1].name,
    memberList: [
      MemberFactory.execute({
        id: memberDataList[2].id,
        name: memberDataList[2].name,
        email: memberDataList[2].email,
        activityStatus: memberDataList[2].activityStatus,
      }),
      MemberFactory.execute({
        id: memberDataList[3].id,
        name: memberDataList[3].name,
        email: memberDataList[3].email,
        activityStatus: memberDataList[3].activityStatus,
      }),
      MemberFactory.execute({
        id: memberDataList[4].id,
        name: memberDataList[4].name,
        email: memberDataList[4].email,
        activityStatus: memberDataList[4].activityStatus,
      }),
    ],
  }),
];
export const expectedTeam = TeamFactory.execute({
  id: nestedTeamData.id,
  name: nestedTeamData.name,
  pairList: expectedPairList,
});
