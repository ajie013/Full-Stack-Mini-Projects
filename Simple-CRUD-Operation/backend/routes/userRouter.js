import express from  'express'
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.delete('/delete_user/:id', deleteUser);

router.put('/update_user/:id', updateUser);

router.post('/add_user', addUser);

export default router