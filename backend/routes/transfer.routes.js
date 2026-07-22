import { Router } from "express";
import prisma from "../db.js";
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { remark, equipmentId, originCenterId, originElectricianId, destinationCenterId, destinationElectricianId, userId } = req.body

        const equipment = await prisma.equipment.findUnique({
            where: {
                id: Number(equipmentId)
            }
        })

        if ((destinationCenterId && destinationElectricianId) || (!destinationCenterId && !destinationElectricianId)) {
            return res.status(400).json({
                error: "Choose only one destination: Center or Electrician."
            })
        }

        if (originCenterId) {
            if (equipment.centerId !== originCenterId) {
                return res.status(400).json({
                    error: "Equipment does not belong to this center."
                })
            }
        }

        if (originElectricianId) {
            if (equipment.electricianId !== originElectricianId) {
                return res.status(400).json({
                    error: "Equipment does not belong to this electrician."
                })
            }
        }

        // $transaction serve para fazer varias operações
        const transfer = await prisma.$transaction(async (tx) => {

            // Atualiza o responsável atual pelo equipamento
            await tx.equipment.update({
                where: {
                    id: Number(equipmentId)
                },
                data: {
                    centerId: destinationCenterId ?? null,
                    electricianId: destinationElectricianId ?? null
                }
            })

            // Cria o histórico
            return await tx.transfer.create({
                data: {
                    remark,
                    equipmentId,

                    originCenterId,
                    originElectricianId,

                    destinationCenterId,
                    destinationElectricianId,

                    userId
                }
            })

        })

        return res.status(201).json(transfer)

    } catch (error) {
        return res.status(500).json({
            error: "Request error!"
        })
    }
})

export default router