/*
  Warnings:

  - You are about to alter the column `whatsapp` on the `secretaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" ALTER COLUMN "whatsapp" SET DATA TYPE VARCHAR(15);
