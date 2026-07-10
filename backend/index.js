import express from "express"

import teamRouter from './routes/team.routes.js'
import centerRouter from './routes/centers.routes.js'

const app = express()

app.use(express.json())

app.use('/team', teamRouter)
app.use('/center', centerRouter)

app.listen(3000, () => console.log('Servidor iniciado!'))