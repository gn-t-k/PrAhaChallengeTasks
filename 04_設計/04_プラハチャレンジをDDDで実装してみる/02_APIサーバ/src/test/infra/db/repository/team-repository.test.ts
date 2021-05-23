import { TeamRepository } from "infra/db/repository/team-repository";

describe("TeamRepository", () => {
  test("getAll", async () => {
    const teamStructure = await new TeamRepository().getAll();

    expect(teamStructure).toEqual([]);
  });
});
