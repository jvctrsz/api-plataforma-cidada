/*
  Warnings:

  - Added the required column `secretario_id` to the `secretaria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."secretaria" ADD COLUMN     "secretario_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."secretaria" ADD CONSTRAINT "secretaria_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
