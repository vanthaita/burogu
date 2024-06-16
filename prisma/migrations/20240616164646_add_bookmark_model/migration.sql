/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[refresh_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_postId_userId_key" ON "Bookmark"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_refresh_token_key" ON "User"("refresh_token");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
