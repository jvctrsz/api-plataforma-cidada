-- AlterTable
ALTER TABLE "public"."categorias" ADD COLUMN     "secretaria_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."categorias" ADD CONSTRAINT "categorias_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "public"."secretaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
