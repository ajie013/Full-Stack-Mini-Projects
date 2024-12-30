import express from 'express'
import { getMealByName,getMealById } from '../controller/homeController.js';
const homeRouter = express.Router();

homeRouter.get('/home/meals/:name',getMealByName)
homeRouter.get('/home/meals/info/:id', getMealById)

export default homeRouter