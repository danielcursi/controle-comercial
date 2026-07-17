import { Router } from "express";
import prisma from "../db.js";
const router = Router();

router.get('/', async (req, res) => {
    try{
        const equipments = await prisma.equipment.findMany()
        return res.status(200).json(equipments)
    } catch (error) {
        return res.status(500).json({ error: "Server error!" })
    }
})

router.post('/', async (req, res) => {
    try{
        const { nc, status, installation, remark, eorder, brandId, materialId, centerId, electricianId } = req.body

        if(!nc || !brandId || !materialId || !centerId){
            return res.status(400).json({ error: "Invalid data" })
        }

        const newEquipment = await prisma.equipment.create({
            data: { nc, status, installation, remark, eorder, brandId, materialId, centerId, electricianId }
        })

        res.status(201).json(newEquipment)

    } catch (error){
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: "There is already an equipment with this NC!" })
        }

        return res.status(500).json({
            error: "Request error"
        })
    }
})


export default router