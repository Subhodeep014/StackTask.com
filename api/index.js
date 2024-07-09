import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log('MongoDB is connected!'))
.catch(err =>{
    console.log(err);
})
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes)

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