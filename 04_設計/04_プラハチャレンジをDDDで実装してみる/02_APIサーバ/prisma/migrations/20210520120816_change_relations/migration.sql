/*
  Warnings:

  - Made the column `pairId` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `Pair` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_pairId_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "pairId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pair" ALTER COLUMN "teamId" SET NOT NULL;
