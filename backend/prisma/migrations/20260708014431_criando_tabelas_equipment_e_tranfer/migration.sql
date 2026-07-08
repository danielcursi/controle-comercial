-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "nc" VARCHAR(150) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'EM_ESTOQUE',
    "installation" TIMESTAMP(3),
    "remark" VARCHAR(255),
    "registration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "materialId" INTEGER NOT NULL,
    "centerId" INTEGER,
    "electricianId" INTEGER,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer" (
    "id" SERIAL NOT NULL,
    "movement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remark" VARCHAR(255),
    "equipmentId" INTEGER NOT NULL,
    "originCenterId" INTEGER,
    "originElectricianId" INTEGER,
    "destinationCenterId" INTEGER,
    "destinationElectricianId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_nc_key" ON "equipment"("nc");

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "logisticsCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_electricianId_fkey" FOREIGN KEY ("electricianId") REFERENCES "electrician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_originCenterId_fkey" FOREIGN KEY ("originCenterId") REFERENCES "logisticsCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_originElectricianId_fkey" FOREIGN KEY ("originElectricianId") REFERENCES "electrician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_destinationCenterId_fkey" FOREIGN KEY ("destinationCenterId") REFERENCES "logisticsCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_destinationElectricianId_fkey" FOREIGN KEY ("destinationElectricianId") REFERENCES "electrician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
