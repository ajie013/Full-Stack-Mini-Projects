import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from './middleware/logger.js'
import homeRouter from './routes/homeRouter.js'
import categoriesRouter from './routes/categoriesRouter.js'

dotenv.config();

const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json())
app.use(cors())
app.use(logger)
app.use(homeRouter)
app.use(categoriesRouter)


app.listen(PORT, () =>{
    console.log(`Server is listening to port ${PORT}`)
})