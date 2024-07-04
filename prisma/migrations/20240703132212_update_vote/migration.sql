/*
  Warnings:

  - Added the required column `isUpvote` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUpvote` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "isUpvote" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refresh_token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "isUpvote" BOOLEAN NOT NULL;
