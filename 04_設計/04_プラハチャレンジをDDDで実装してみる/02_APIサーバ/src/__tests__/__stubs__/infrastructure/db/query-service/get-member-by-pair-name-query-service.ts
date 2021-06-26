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
  ],
};

export const memberDataList = [
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
];
