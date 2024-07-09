import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { addTodo, getTodos } from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/test', async(req, res)=>{
    res.json("api working for todo")
})
router.post('/create', verifyToken, addTodo)
router.get('/get', verifyToken, getTodos)

export default router;