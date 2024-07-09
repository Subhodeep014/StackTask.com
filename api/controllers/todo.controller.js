import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";

import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const addTodo = async(req, res, next)=>{
    if(!req.body.name || req.body.name===''){
        return next(errorHandler(400, 'Please add something to todo'))
    }
    if(req.user.id){
        const userExists = await User.findOne({_id:req.user.id})
        if(userExists){
            try {
                const newTodo = new Todo({
                    name: req.body.name,
                    userId : req.user.id
                })
                const savedTodo = await newTodo.save();
                res.status(200).json(savedTodo)
            } catch (error) {
                next(error)
            }
        }
    }
} 
export const getTodos = async (req, res, next) => {
    try {
        const { searchTerm, order } = req.query;
        const searchOptions = {
            userId: req.user.id
        };

        if (searchTerm) {
            searchOptions.name = { $regex: searchTerm, $options: "i" };
        }

        const sortOptions = order === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

        const todos = await Todo.find(searchOptions).sort(sortOptions);
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};
export const updateTodo = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this todo'));
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.todoId,
            {
                $set: {
                    name: req.body.name,
                    completed: req.body.completed
                }
            },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};
export const deleteTodo = async (req, res, next) => {
    if(req.user.id!==req.params.userId){
        return next(errorHandler(403,'You are not a valid user'));
    }
    try {
        await Todo.findByIdAndDelete(req.params.todoId); 
        res.status(200).json('The post has been deleted');
        
    } catch (error) {
        next(error);
    }
};
