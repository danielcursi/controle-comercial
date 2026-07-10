import { Router } from "express";
import prisma from '../db.js'
const router = Router()

// full teams
router.get('/', async (req, res) => {
    try {
        const teams = await prisma.team.findMany()
        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500).json({ error: "Server error" })
    }
})

// Creat team
router.post('/', async (req, res) => {
    try {

        const { name } = req.body

        if (!name) {
            return res.status(400).json({ error: "Name invalid!" })
        }

        const newTeam = await prisma.team.create({ data: { name } })
        res.status(201).json(newTeam)

    } catch (error) {
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: 'There is already a team with that name!' })
        }

        return res.status(500).json({
            error: "Server erro"
        })
    }

})

// update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body

        const team = await prisma.team.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!team) {
            return res.status(404).json({
                error: "Team not found!"
            })
        }

        const updateTeam = await prisma.team.update({
            where: {
                id: Number(id)
            },
            data: updatedData
        })
        res.status(200).json(updateTeam)

    } catch (error) {
        res.status(400).json({ error: "Request error!" })
    }
})

// delete team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const team = await prisma.team.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!team){
            return res.status(400).json({ error: "Team not found!"})
        }

        const deleteTeam = await prisma.team.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(deleteTeam)
    } catch (error){
        res.status(400).json({ error: "Request error!"})
    }
})

export default router