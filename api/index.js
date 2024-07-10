import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import todoRoutes from './routes/todo.route.js'
import path from 'path'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log('MongoDB is connected!'))
.catch(err =>{
    console.log(err);
})
const _dirname = path.resolve()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes)
app.use('/api/todo', todoRoutes)

app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))
})
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

app.listen(3000, ()=>{
    console.log(`Server is running on port 3000!`)
})