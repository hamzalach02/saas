/*
  Warnings:

  - You are about to drop the column `numberProjects` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "numberProjects",
DROP COLUMN "plan";

-- DropEnum
DROP TYPE "Plan";
