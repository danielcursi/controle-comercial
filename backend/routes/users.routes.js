import { Router } from "express";
import prisma from "../db.js";
import bcrypt from 'bcrypt'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: "Server error!" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, password, type, centerId } = req.body

        if (!name || !password || !type || !centerId) {
            return res.status(400).json({ error: "Invalid data" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: { name, type, centerId, password: hashedPassword }
        })

        res.status(201).json(newUser)

    } catch (error) {
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: 'There is already a user with that name!' })
        }

        return res.status(500).json({
            error: "Request error!"
        })
    }
})


// rota de atualização de tipo
// !!!VOLTAR PARA COLOCAR PARA APENAS ADMIN PODERAM USAR ESSA ROTA!!!
router.put('/:id/type', async (req, res) => {
    try {
        const { id } = req.params
        const { type } = req.body

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            })
        }

        const updatedType = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: { type }
        })
        res.status(204).json(updatedType)

    } catch (error) {
        res.status(500).json({ error: "Request error!" })
    }
})

// atualizar senha
router.put('/:id/password', async (req, res) => {
    try {
        const { id } = req.params
        const { password, newPassword } = req.body

        if (!password || !newPassword) {
            return res.status(400).json({
                error: "Password and newPassword are required."
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            })
        }

        const correctPass = await bcrypt.compare(password, user.password)

        if (!correctPass) {
            return res.status(401).json({
                erro: "Incorrect passwords."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                password: hashedPassword
            }
        })

        return res.sendStatus(204)

    } catch (error) {
        res.status(500).json({ error: "Request error!" })
    }
})

// Atualizar campos comuns
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, active, centerId } = req.body

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            })
        }

        const data = {}

        if (name !== undefined) data.name = name
        if (active !== undefined) data.active = active
        if (centerId !== undefined) data.centerId = centerId

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data
        })
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: "Request error!" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            })
        }

        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(deleteUser)
    } catch (error){
        res.status(500).json({ error: "Request error!"})
    }
})

export default router