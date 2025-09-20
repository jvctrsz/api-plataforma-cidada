/*
  Warnings:

  - You are about to drop the column `refreshTime` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" DROP COLUMN "refreshTime",
DROP COLUMN "refreshToken",
ADD COLUMN     "refreshPasswordTime" TIMESTAMP(3),
ADD COLUMN     "refreshPasswordToken" TEXT;
