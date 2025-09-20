-- AlterTable
ALTER TABLE "public"."usuarios" ALTER COLUMN "senha" DROP NOT NULL,
ALTER COLUMN "senha" SET DATA TYPE TEXT;
