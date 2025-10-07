/*
  Warnings:

  - You are about to drop the column `user_id` on the `Mensagens` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `Mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Mensagens" DROP CONSTRAINT "Mensagens_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Mensagens" DROP COLUMN "user_id",
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Mensagens" ADD CONSTRAINT "Mensagens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
