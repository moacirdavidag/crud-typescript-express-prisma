-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
