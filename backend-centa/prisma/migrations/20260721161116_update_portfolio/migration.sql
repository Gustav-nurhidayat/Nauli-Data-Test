/*
  Warnings:

  - The `techStack` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "images" TEXT[],
DROP COLUMN "techStack",
ADD COLUMN     "techStack" TEXT[];
