/*
  Warnings:

  - You are about to drop the column `secretaria_id` on the `solicitacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."solicitacao" DROP CONSTRAINT "fk_solicitacao_secretaria";

-- AlterTable
ALTER TABLE "public"."solicitacao" DROP COLUMN "secretaria_id";
