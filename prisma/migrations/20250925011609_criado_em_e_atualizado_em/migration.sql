-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "atualizado_em" TIMESTAMP(3),
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
