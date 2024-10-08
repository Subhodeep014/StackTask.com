import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
export const test = (req, res)=>{
    res.status(200).json("Api is workingggg!")
}
export const signup = async(req, res, next)=>{
    const {fullname, email, password} = req.body;
    if(!fullname || !email || !password || fullname==='' || email=== '' || password ===''){
        return next(errorHandler(400, 'All feilds are required'));
    }
    const userExits = await User.findOne({email});
    if(userExits){
        return next(errorHandler(400, 'User exists , Please sign in'))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        fullname,
        email,
        password: hashedPassword 
    })
    try {
        await newUser.save();
        res.json("Signed up Successfully")
    } catch (error) {
        return next(errorHandler(500, 'Error during sign up'))
    }
}
export const signin = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password || email==='' || password===''){
        return next(errorHandler(400, 'All feilds are required'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, 'User not found'))
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc
        res.status(200).cookie('access_token', token, {
        httpOnly:true, maxAge: 24 * 60 * 60 * 1000 }).json(rest);
    } catch (error) {
        next();
    }
}
export const signout = async(req, res, next)=>{
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out')
    } catch (error) {
        next(error);
    }
}
export const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return next(errorHandler(404, 'User not found'))
        }
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);


        
    } catch ( error) {
        next(error);
    }
}
