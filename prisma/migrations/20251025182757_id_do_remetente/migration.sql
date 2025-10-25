/*
  Warnings:

  - Added the required column `remetente_id` to the `mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."mensagens" ADD COLUMN     "remetente_id" INTEGER NOT NULL;
