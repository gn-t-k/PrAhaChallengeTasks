/*
  Warnings:

  - Added the required column `isDefault` to the `ActivityStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDefault` to the `ProgressStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityStatus" ADD COLUMN     "isDefault" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ProgressStatus" ADD COLUMN     "isDefault" BOOLEAN NOT NULL;
