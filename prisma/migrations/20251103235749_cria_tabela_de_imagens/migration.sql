-- CreateTable
CREATE TABLE "public"."imagens" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" INTEGER NOT NULL,
    "solicitacao_id" INTEGER NOT NULL,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."imagens" ADD CONSTRAINT "imagens_solicitacao_id_fkey" FOREIGN KEY ("solicitacao_id") REFERENCES "public"."solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
