/*
  Warnings:

  - Made the column `protocolo` on table `solicitacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."solicitacao" ALTER COLUMN "protocolo" SET NOT NULL;
