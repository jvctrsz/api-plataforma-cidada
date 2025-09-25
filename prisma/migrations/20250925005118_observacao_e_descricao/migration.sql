/*
  Warnings:

  - Added the required column `descricao` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "descricao" VARCHAR(180) NOT NULL,
ALTER COLUMN "observacao" DROP NOT NULL;
