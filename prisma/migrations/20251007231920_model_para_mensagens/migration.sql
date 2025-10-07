-- CreateTable
CREATE TABLE "public"."Mensagens" (
    "id" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "enviado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solicitacao_id" INTEGER NOT NULL,

    CONSTRAINT "Mensagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Mensagens" ADD CONSTRAINT "Mensagens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mensagens" ADD CONSTRAINT "Mensagens_solicitacao_id_fkey" FOREIGN KEY ("solicitacao_id") REFERENCES "public"."solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
