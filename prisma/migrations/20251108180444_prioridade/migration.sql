-- CreateEnum
CREATE TYPE "public"."Prioridade" AS ENUM ('alta', 'normal', 'baixa');

-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "prioridade" "public"."Prioridade" NOT NULL DEFAULT 'baixa';
