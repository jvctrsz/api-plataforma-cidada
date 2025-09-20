-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "refreshTime" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT;
