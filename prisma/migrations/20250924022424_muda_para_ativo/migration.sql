/*
  Warnings:

  - You are about to drop the column `status` on the `secretaria` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" DROP COLUMN "status",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;
