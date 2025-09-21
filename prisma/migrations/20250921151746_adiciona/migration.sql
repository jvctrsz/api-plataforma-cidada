/*
  Warnings:

  - You are about to drop the column `refreshPasswordTime` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `refreshPasswordToken` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" DROP COLUMN "refreshPasswordTime",
DROP COLUMN "refreshPasswordToken",
ADD COLUMN     "recoveryPassword" TIMESTAMP(3);
