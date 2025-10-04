/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `repoLink` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
DROP COLUMN "repoLink",
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "technologies" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled Project',
ALTER COLUMN "liveLink" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "features" SET DATA TYPE TEXT;
