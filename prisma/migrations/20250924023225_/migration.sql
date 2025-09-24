/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `secretaria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "secretaria_nome_key" ON "public"."secretaria"("nome");
