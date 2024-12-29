import express from 'express'
import { getMealByLetter } from '../controller/homeController.js';
const homeRouter = express.Router();

homeRouter.get('/home/meals/:name',getMealByLetter)

export default homeRouter