/*
  Warnings:

  - You are about to drop the column `ativo` on the `categorias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."categorias" DROP COLUMN "ativo",
ADD COLUMN     "secretataria_nome" TEXT;
