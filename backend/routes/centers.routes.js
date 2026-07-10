import { Router } from "express";
import prisma from "../db.js";
const router = Router()

// full logistics Centers
router.get('/', async (req, res) => {
    try {
        const centers = await prisma.logisticsCenter.findMany()
        return res.status(200).json(centers)
    } catch (error) {
        return res.status(500).json({ error: "Server error"})
    }
})

// create centers
router.post('/', async (req, res) => {
    try{
        const { city, responsible } = req.body

        if(!city || !responsible){
            return res.status(400).json({ error: "invalid data"})
        }

        const newcenter = await prisma.logisticsCenter.create({
            data: { city, responsible}
        })
        
        res.status(201).json(newcenter)

    } catch (error){
        if (error?.code === 'P2002'){
            return res.status(409).json({ error: 'There is already a center with that name!' })
        }

        return res.status(500).json({
            error: "Server error"
        })
    }
})

// update centers
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const updatedCenter = req.body

        const center = await prisma.logisticsCenter.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!center){
            return res.status(404).json({
                error: "Invalid Data!"
            })
        }

        const updateCenter = await prisma.logisticsCenter.update({
            where: {
                id: Number(id)
            },
            data: updatedCenter
        })
        res.status(200).json(updateCenter)

    } catch (error) {
        res.status(400).json({ error: "Request error!" })
    }
})

// delete center
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const center = await prisma.logisticsCenter.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!center){
            return res.status(400).json({ error: "Center not found!"})
        }

        const deleteCenter = await prisma.logisticsCenter.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(deleteCenter)
    } catch (error){
        res.status(400).json({ error: "Request error!"})
    }
})

export default router