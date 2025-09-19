-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('usuario', 'admin');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "celular" CHAR(13) NOT NULL,
    "telefone" VARCHAR(12),
    "senha" VARCHAR(32) NOT NULL,
    "role" "public"."Role" DEFAULT 'usuario',
    "google_id" TEXT,
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "public"."usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_google_id_key" ON "public"."usuarios"("google_id");
