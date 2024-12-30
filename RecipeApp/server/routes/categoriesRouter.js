import express from 'express'
import { getAllCategories,getFilterByCategory } from '../controller/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories/all',getAllCategories)
categoriesRouter.get('/categories/filter/:category',getFilterByCategory)


export default categoriesRouter