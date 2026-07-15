import { Router } from 'express';
import prisma from '../db.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const brands = await prisma.brand.findMany()
        return res.status(200).json(brands)
    } catch (error) {
        return res.status(500).json({ error: "Server error!" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ error: "Invalid data" })
        }

        const newBrand = await prisma.brand.create({
            data: { name }
        })

        res.status(201).json(newBrand)

    } catch (error) {
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: 'There is already a user with that name!' })
        }

        return res.status(500).json({
            error: "Request error!"
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const brand = await prisma.brand.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!brand) {
            return res.status(404).json({
                error: "Brand not found!"
            })
        }

        const updatedBrand = await prisma.brand.update({
            where: {
                id: Number(id)
            },
            data: { name }
        })

        res.status(204).json(updatedBrand)

    } catch (error) {
        return res.status(500).json({ error: "Request error!" })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params

        const brand = await prisma.brand.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!brand){
            return res.status(404).json({
                error: "Brand not found!"
            })
        }

        const deleteBrand = await prisma.brand.delete({
            where: {
                id: Number(id)
            }
        }) 

        res.status(200).json(deleteBrand)
        
    } catch(error){
        res.status(500).json({ error: "Request error!" })
    }
})

export default router