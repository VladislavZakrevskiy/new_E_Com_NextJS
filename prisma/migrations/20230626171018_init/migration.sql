/*
  Warnings:

  - You are about to drop the column `tags` on the `product` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "tags",
ADD COLUMN     "tag_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "tag" (
    "tag_id" UUID NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("tag_id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;
