const createdAt = new Date();
const updatedAt = new Date();

export const nestedTeamData = {
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

export const memberData = {
  id: "a5294443-5945-4a74-aac0-593671ed166b",
  name: "Allison Berge",
  email: "Rosa36@gmail.com",
  activityStatus: "在籍中",
  createdAt,
  updatedAt,
};
