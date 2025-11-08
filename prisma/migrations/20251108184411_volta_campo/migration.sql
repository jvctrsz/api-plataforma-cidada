/*
  Warnings:

  - A unique constraint covering the columns `[protocolo]` on the table `solicitacao` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "protocolo" VARCHAR(14);

-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_protocolo_key" ON "public"."solicitacao"("protocolo");
