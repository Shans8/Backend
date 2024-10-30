-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "stock_quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
