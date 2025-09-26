/*
  Warnings:

  - You are about to drop the column `secretario` on the `secretaria` table. All the data in the column will be lost.
  - You are about to alter the column `bairro` on the `secretaria` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `celular` on the `secretaria` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `numero` on the `secretaria` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `telefone` on the `secretaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(14)`.
  - Added the required column `secretario_nome` to the `secretaria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" DROP COLUMN "secretario",
ADD COLUMN     "secretario_nome" TEXT NOT NULL,
ALTER COLUMN "bairro" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "celular" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "numero" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "telefone" SET DATA TYPE VARCHAR(14);
