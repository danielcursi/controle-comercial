import { Router } from "express";
import prisma from "../db.js";
const router = Router();

router.get('/', async (req, res) => {
    try{
        const material = await prisma.material.findMany()
        return res.status(200).json(material)
    } catch (error){
        return res.status(500).json({ error: "Server error!" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { cod, description, color } = req.body

        if (!cod || ! description){
            return res.status(400).json({ error: "Invalid data" })
        }

        const newMaterial = await prisma.material.create({
            data: { cod, description, color }
        })

        res.status(201).json(newMaterial)

    } catch (error) {
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: 'There is already a material with that cod' })
        }
        return res.status(500).json({
            error: "Request error!"
        })
    }
})

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const updateData = req.body

        const material = await prisma.material.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!material){
            return res.status(404).json({
                error: "Material not found!"
            })
        }

        const updatedDates = await prisma.material.update({
            where: {
                id: Number(id)
            },
            data: updateData
        })
        res.status(204).json(updatedDates)

    } catch (error){
        res.status(500).json({ error: "Request error!" })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params

        const material = await prisma.material.findUnique()

        if(!material){
            return res.status(404).json({
                error: "Material not found!"
            })
        }

        const deleteMaterial = await prisma.material.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(deleteMaterial)
        
    } catch (error){
        return res.status(500).json({ error: "Request error!" })
    }
})


export default router