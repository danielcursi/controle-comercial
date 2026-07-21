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

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const { nc, status, installation, remark, eorder, brandId, materialId, centerId, electricianId } = req.body

        const equipment = await prisma.equipment.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!equipment){
            return res.status(404).json({
                error: "Equipment not found!"
            })
        }

        const data = {}

        if (nc !== undefined) data.nc = nc
        if (status !== undefined) data.status = status
        if (installation !== undefined) data.installation = new Date(installation)
        if (remark !== undefined) data.remark = remark
        if (eorder !== undefined) data.eorder = eorder
        if (brandId !== undefined) data.brandId = brandId
        if (materialId !== undefined) data.materialId = materialId
        if (centerId !== undefined) data.centerId = centerId
        if (electricianId !== undefined) data.electricianId = electricianId

        const updateEquipment = await prisma.equipment.update({
            where: {
                id: Number(id)
            },
            data
        })
        res.status(204).json(updateEquipment)

    } catch (error){
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params

        const equipment = await prisma.equipment.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!equipment){
            return res.status(404).json({ error: "Equipment not found!" })
        }

        const deleteEquip = await prisma.equipment.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(deleteEquip)
        
    } catch (error){
        return res.status(500).json({ error: "Request error!" })
    }
    
})


export default router