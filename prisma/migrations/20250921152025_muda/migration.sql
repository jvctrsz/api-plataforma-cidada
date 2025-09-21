/*
  Warnings:

  - You are about to drop the column `recoveryPassword` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" DROP COLUMN "recoveryPassword",
ADD COLUMN     "redefinido_em" TIMESTAMP(3);
