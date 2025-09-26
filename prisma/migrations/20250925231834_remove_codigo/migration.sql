/*
  Warnings:

  - You are about to drop the column `codigo` on the `solicitacao` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."solicitacao_codigo_key";

-- AlterTable
ALTER TABLE "public"."solicitacao" DROP COLUMN "codigo";
