-- CreateEnum
CREATE TYPE "EnumMeasuretype" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "customers" (
    "customer_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "measures" (
    "measure_uuid" TEXT NOT NULL,
    "measure_value" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "EnumMeasuretype" NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("measure_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_code_key" ON "customers"("customer_code");

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "customers"("customer_code") ON DELETE RESTRICT ON UPDATE CASCADE;
