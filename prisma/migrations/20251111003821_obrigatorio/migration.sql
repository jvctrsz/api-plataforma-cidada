/*
  Warnings:

  - Made the column `secretataria_nome` on table `categorias` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."categorias" ALTER COLUMN "secretataria_nome" SET NOT NULL;
