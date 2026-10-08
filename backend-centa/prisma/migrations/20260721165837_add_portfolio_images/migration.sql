/*
  Warnings:

  - You are about to drop the column `images` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "images",
ALTER COLUMN "techStack" SET NOT NULL,
ALTER COLUMN "techStack" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "PortfolioImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortfolioImage" ADD CONSTRAINT "PortfolioImage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
