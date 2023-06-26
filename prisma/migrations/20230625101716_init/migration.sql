-- CreateTable
CREATE TABLE "order" (
    "order_id" UUID NOT NULL,
    "user_id" UUID,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" UUID NOT NULL,
    "order_id" UUID,
    "price" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT[],
    "rating" INTEGER NOT NULL,
    "sells" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" UUID,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Token" (
    "refresh_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("refresh_token")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_refresh_token_fkey" FOREIGN KEY ("refresh_token") REFERENCES "Token"("refresh_token") ON DELETE SET NULL ON UPDATE CASCADE;
