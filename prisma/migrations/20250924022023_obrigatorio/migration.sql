/*
  Warnings:

  - Made the column `nome` on table `secretaria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" ALTER COLUMN "nome" SET NOT NULL;
