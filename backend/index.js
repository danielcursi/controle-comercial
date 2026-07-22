import express from "express"

import teamRouter from './routes/team.routes.js'
import centerRouter from './routes/centers.routes.js'
import userRouter from './routes/users.routes.js'
import electricianRouter from './routes/electrician.routes.js'
import brandRouter from './routes/brand.routes.js'
import materialRouter from './routes/material.routes.js'
import equipmentRouter from './routes/equipment.routes.js'
import transferRouter from './routes/transfer.routes.js'

const app = express()

app.use(express.json())

app.use('/team', teamRouter)
app.use('/center', centerRouter)
app.use('/user', userRouter)
app.use('/electrician', electricianRouter)
app.use('/brand', brandRouter)
app.use('/material', materialRouter)
app.use('/equipment', equipmentRouter)
app.use('/transfer', transferRouter)

app.listen(3000, () => console.log('Servidor iniciado!'))