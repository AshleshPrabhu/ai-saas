-- AlterTable
ALTER TABLE "User" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
