import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/test', async(req, res)=>{
    res.json("api working for todo")
})
router.post('/create', verifyToken, addTodo)
router.get('/get', verifyToken, getTodos)
router.put(`/update/:todoId/:userId`, verifyToken, updateTodo)
router.delete(`/delete/:todoId/:userId`, verifyToken, deleteTodo)

export default router;