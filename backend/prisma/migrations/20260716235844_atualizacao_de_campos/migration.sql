/*
  Warnings:

  - You are about to drop the column `brandId` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `eorder` on the `material` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "material" DROP CONSTRAINT "material_brandId_fkey";

-- AlterTable
ALTER TABLE "equipment" ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "eorder" VARCHAR(50);

-- AlterTable
ALTER TABLE "material" DROP COLUMN "brandId",
DROP COLUMN "eorder";

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
