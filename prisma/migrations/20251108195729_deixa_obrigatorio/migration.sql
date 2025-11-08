/*
  Warnings:

  - Made the column `categoria_id` on table `solicitacao` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."solicitacao" DROP CONSTRAINT "solicitacao_categoria_id_fkey";

-- AlterTable
ALTER TABLE "public"."solicitacao" ALTER COLUMN "categoria_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."solicitacao" ADD CONSTRAINT "solicitacao_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
