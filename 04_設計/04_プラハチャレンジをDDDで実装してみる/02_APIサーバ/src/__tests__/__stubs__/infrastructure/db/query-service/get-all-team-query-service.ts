const createdAt = new Date();
const updatedAt = new Date();

export const nestedTeamDataList = [
  {
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
      },
      {
        id: "e9ffd5ef-ebdb-4198-b510-261bc34903f4",
        name: "b",
        teamId: "0a3fc828-dc70-49c8-9690-0ed78e212055",
        createdAt,
        updatedAt,
      },
    ],
  },
  {
    id: "a650163c-a0d8-4684-87bc-2522705f66c1",
    name: "3",
    createdAt,
    updatedAt,
    pair: [
      {
        id: "6c222bb3-025a-4d74-ada7-f429fe95dac5",
        name: "a",
        teamId: "a650163c-a0d8-4684-87bc-2522705f66c1",
        createdAt,
        updatedAt,
      },
    ],
  },
  {
    id: "947d3ea0-0ab7-4102-87fe-cd4882a91583",
    name: "2",
    createdAt,
    updatedAt,
    pair: [
      {
        id: "86415550-d53a-4244-a767-88581b816247",
        name: "a",
        teamId: "947d3ea0-0ab7-4102-87fe-cd4882a91583",
        createdAt,
        updatedAt,
      },
      {
        id: "89c2ca7f-fcbc-438b-9783-797dc5b04bf4",
        name: "b",
        teamId: "947d3ea0-0ab7-4102-87fe-cd4882a91583",
        createdAt,
        updatedAt,
      },
    ],
  },
];
