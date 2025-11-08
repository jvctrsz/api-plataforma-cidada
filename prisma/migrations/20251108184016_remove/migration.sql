/*
  Warnings:

  - You are about to drop the column `protocolo` on the `solicitacao` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."solicitacao_protocolo_key";

-- AlterTable
ALTER TABLE "public"."solicitacao" DROP COLUMN "protocolo";
