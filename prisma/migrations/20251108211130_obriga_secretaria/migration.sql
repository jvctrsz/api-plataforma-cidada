/*
  Warnings:

  - Made the column `secretaria_id` on table `categorias` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."categorias" DROP CONSTRAINT "categorias_secretaria_id_fkey";

-- AlterTable
ALTER TABLE "public"."categorias" ALTER COLUMN "secretaria_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."categorias" ADD CONSTRAINT "categorias_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "public"."secretaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
