-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('criado', 'pendente', 'andamento', 'finalizado');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('usuario', 'admin');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "celular" CHAR(15) NOT NULL,
    "telefone" VARCHAR(14),
    "senha" TEXT,
    "role" "public"."Role" DEFAULT 'usuario',
    "google_id" TEXT,
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "redefinido_em" TIMESTAMP(3),
    "valido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."secretaria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "secretaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."solicitacao" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(4) NOT NULL,
    "endereco" VARCHAR(150) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "referencia" VARCHAR(100),
    "bairro" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "observacao" VARCHAR(500) NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'criado',
    "secretaria_id" INTEGER NOT NULL,
    "usuarios_id" INTEGER NOT NULL,

    CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "public"."usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_google_id_key" ON "public"."usuarios"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "secretaria_nome_key" ON "public"."secretaria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "solicitacao_codigo_key" ON "public"."solicitacao"("codigo");

-- AddForeignKey
ALTER TABLE "public"."solicitacao" ADD CONSTRAINT "fk_solicitacao_secretaria" FOREIGN KEY ("secretaria_id") REFERENCES "public"."secretaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."solicitacao" ADD CONSTRAINT "fk_solicitacao_usuarios" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
