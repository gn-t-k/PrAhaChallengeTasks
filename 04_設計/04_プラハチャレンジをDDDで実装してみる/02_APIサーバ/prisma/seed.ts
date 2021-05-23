/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from "@prisma/client";
import { exerciseData } from "./seeds/exercise";
import { exerciseGroupData } from "./seeds/exercise-group";
import { exerciseOnMemberData } from "./seeds/exercise-on-member";
import { memberData } from "./seeds/member";
import { memberOnPairData } from "./seeds/member-on-pair";
import { pairData } from "./seeds/pair";
import { teamData } from "./seeds/team";

const prisma = new PrismaClient();

const main = async () => {
  await Promise.all([
    seedExerciseGroupData(),
    seedMemberData(),
    seedTeamData(),
  ]);
  await Promise.all([seedExerciseData(), seedPairData()]);
  await Promise.all([seedExerciseOnMember(), seedMemberOnPair()]);
};

const seedExerciseGroupData = async () => {
  const requests = exerciseGroupData.map((group) =>
    prisma.exerciseGroup.create({
      data: { ...group },
    }),
  );

  const response = await Promise.all(requests);

  return response;
};

const seedExerciseData = async () => {
  const requests = exerciseData.map((exercise) => {
    const { id, title, description } = exercise;

    return prisma.exercise.create({
      data: {
        id,
        title,
        description,
        exerciseGroup: {
          connect: {
            id: exercise.exerciseGroupId,
          },
        },
      },
    });
  });

  const response = await Promise.all([...requests]);

  return response;
};

const seedMemberData = async () => {
  const requests = memberData.map((member) =>
    prisma.member.create({
      data: { ...member },
    }),
  );

  const response = await Promise.all(requests);

  return response;
};

const seedTeamData = async () => {
  const requests = teamData.map((team) =>
    prisma.team.create({
      data: { ...team },
    }),
  );

  const response = await Promise.all(requests);

  return response;
};

const seedPairData = async () => {
  const requests = pairData.map((pair) => {
    const { id, name } = pair;

    return prisma.pair.create({
      data: {
        id,
        name,
        team: {
          connect: {
            id: pair.teamID,
          },
        },
      },
    });
  });

  const response = await Promise.all(requests);

  return response;
};

const seedExerciseOnMember = async () => {
  const requests = exerciseOnMemberData.map((eom) =>
    prisma.exerciseOnMember.create({
      data: { ...eom },
    }),
  );

  const response = await Promise.all(requests);

  return response;
};

const seedMemberOnPair = async () => {
  const requests = memberOnPairData.map((mop) =>
    prisma.memberOnPair.create({
      data: { ...mop },
    }),
  );

  const response = await Promise.all(requests);

  return response;
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(
    async (): Promise<void> => {
      await prisma.$disconnect();
    },
  );
