import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import { errorHandler } from './middleware/errorHandler.js';
import router from './routes/userRouter.js';
import dotenv from 'dotenv'

dotenv.config()


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server running on PORT ${PORT}`)
})