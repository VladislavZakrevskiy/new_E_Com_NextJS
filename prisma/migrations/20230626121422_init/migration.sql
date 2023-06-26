/*
  Warnings:

  - Made the column `product_id` on table `feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_product_id_fkey";

-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "to_id" UUID,
ALTER COLUMN "product_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
