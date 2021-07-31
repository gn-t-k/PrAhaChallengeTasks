/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ActivityStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ExerciseGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,teamId]` on the table `Pair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ProgressStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivityStatus.name_unique" ON "ActivityStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise.title_unique" ON "Exercise"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseGroup.name_unique" ON "ExerciseGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Member.email_unique" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pair.name_teamId_unique" ON "Pair"("name", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressStatus.name_unique" ON "ProgressStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team.name_unique" ON "Team"("name");
