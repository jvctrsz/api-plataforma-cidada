/*
  Warnings:

  - A unique constraint covering the columns `[secretario_id]` on the table `secretaria` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `secretario_id` on the `secretaria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."secretaria" DROP CONSTRAINT "secretaria_id_fkey";

-- AlterTable
ALTER TABLE "public"."secretaria" DROP COLUMN "secretario_id",
ADD COLUMN     "secretario_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "secretaria_secretario_id_key" ON "public"."secretaria"("secretario_id");

-- AddForeignKey
ALTER TABLE "public"."secretaria" ADD CONSTRAINT "secretaria_secretario_id_fkey" FOREIGN KEY ("secretario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
