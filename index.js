import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json({ extended: true, limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))
app.use(cors())
app.use(routes)

mongoose.connect(process.env.DB_URI)
    .then(app.listen(process.env.PORT || 5000, () => {
        console.log(`Server on port ${process.env.PORT}`)
    }))