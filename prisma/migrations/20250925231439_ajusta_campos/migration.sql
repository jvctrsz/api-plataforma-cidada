/*
  Warnings:

  - Added the required column `secretario` to the `secretaria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" ADD COLUMN     "atualizado_em" TIMESTAMP(3),
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "celular" TEXT,
ADD COLUMN     "cep" VARCHAR(8),
ADD COLUMN     "cidade" VARCHAR(100),
ADD COLUMN     "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" VARCHAR(255),
ADD COLUMN     "email" VARCHAR(150),
ADD COLUMN     "logradouro" VARCHAR(150),
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "secretario" TEXT NOT NULL,
ADD COLUMN     "telefone" VARCHAR(50),
ADD COLUMN     "uf" CHAR(2),
ADD COLUMN     "whatsapp" VARCHAR(50),
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(150);
