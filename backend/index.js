import express from "express"

import teamRouter from './routes/team.routes.js'

const app = express()

app.use(express.json())

app.use('/team', teamRouter)

app.listen(3000, () => console.log('Servidor iniciado!'))