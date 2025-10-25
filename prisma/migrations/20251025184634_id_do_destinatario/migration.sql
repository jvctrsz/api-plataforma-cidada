/*
  Warnings:

  - You are about to drop the column `remetente_id` on the `mensagens` table. All the data in the column will be lost.
  - Added the required column `destinatario_id` to the `mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."mensagens" DROP COLUMN "remetente_id",
ADD COLUMN     "destinatario_id" INTEGER NOT NULL;
