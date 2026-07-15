import { Router } from "express";
import prisma from "../db.js";
const router = Router();

router.get('/', async (req, res) => {
    try{
        const electricians = await prisma.electrician.findMany()
        res.status(200).json(electricians)
    } catch (error){
        return res.status(500).json({ error: "Server error!" })
    }
})

router.post('/', async (req, res) => {
    try{
        const { name, teamId } = req.body
        
        if(!name || !teamId){
            return res.status(400).json({ error: "Invalid data" })
        }

        const newElect = await prisma.electrician.create({
            data: { name, teamId }
        })
        
        res.status(201).json(newElect)

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
    try{
        const { id } = req.params
        const updateData = req.body

        const electrician = await prisma.electrician.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!electrician){
            return res.status(404).json({ error: "Electrician not found!" })
        }

        const updated = await prisma.electrician.update({
            where: {
                id: Number(id)
            },
            data: updateData
        })

        res.status(204).json(updated)

    } catch (error) {
        res.status(500).json({ error: "Request error!"})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params

        const electrician = await prisma.electrician.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!electrician){
            return res.status(404).json({
                error: "Electrician not found!"
            })
        }

        const deleteElect = await prisma.electrician.delete({
            where: {
                id: Number(id)
            }
        })
        
        res.status(200).json(deleteElect)

    } catch (error){
        res.status(500).json({ error: "Request error!" })
    }
})


export default router