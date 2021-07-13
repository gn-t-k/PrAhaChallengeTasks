/*
  Warnings:

  - You are about to drop the column `progressStatusId` on the `ExerciseOnMember` table. All the data in the column will be lost.
  - You are about to drop the column `activityStatusId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `pairId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `ActivityStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgressStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `progressStatus` to the `ExerciseOnMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityStatus` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseOnMember" DROP CONSTRAINT "ExerciseOnMember_progressStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_activityStatusId_fkey";

-- AlterTable
ALTER TABLE "ExerciseOnMember" DROP COLUMN "progressStatusId",
ADD COLUMN     "progressStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "activityStatusId",
DROP COLUMN "pairId",
ADD COLUMN     "activityStatus" TEXT NOT NULL;

-- DropTable
DROP TABLE "ActivityStatus";

-- DropTable
DROP TABLE "ProgressStatus";

-- CreateTable
CREATE TABLE "MemberOnPair" (
    "memberId" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberOnPair.memberId_pairId_unique" ON "MemberOnPair"("memberId", "pairId");

-- AddForeignKey
ALTER TABLE "MemberOnPair" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnPair" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;
