-- AlterTable
ALTER TABLE "public"."solicitacao" ADD COLUMN     "categoria_id" INTEGER;

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "public"."categorias"("nome");

-- AddForeignKey
ALTER TABLE "public"."solicitacao" ADD CONSTRAINT "solicitacao_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
