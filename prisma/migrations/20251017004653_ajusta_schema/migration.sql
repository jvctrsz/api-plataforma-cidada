/*
  Warnings:

  - You are about to drop the `Mensagens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `funcionario_id` to the `solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Mensagens" DROP CONSTRAINT "Mensagens_solicitacao_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Mensagens" DROP CONSTRAINT "Mensagens_usuario_id_fkey";

-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "funcionario_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Mensagens";

-- CreateTable
CREATE TABLE "public"."mensagens" (
    "id" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "enviado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solicitacao_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."mensagens" ADD CONSTRAINT "mensagens_solicitacao_id_fkey" FOREIGN KEY ("solicitacao_id") REFERENCES "public"."solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensagens" ADD CONSTRAINT "mensagens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
