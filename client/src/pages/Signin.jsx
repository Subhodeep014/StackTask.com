import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '@/redux/user/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Signin() {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(state => state.user)
    
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // if (emailRef.current) emailRef.current.value = '';
        // if (passwordRef.current) passwordRef.current.value = '';
        // emailRef.current.focus()
        if(!formData.email){
            return dispatch(signInFailure('Please fill out all feilds'))
        }
        try {
            dispatch(signInStart());
            const res = await axios.post('/api/auth/signin', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.data;
            console.log(data)
            if(data.success === false){
                dispatch(signInFailure(data.message));
                toast.error(`Wrong email or password`)
            }
            else{
                dispatch(signInSuccess(data));
                console.log(data);
                toast.success(`Welcome ${data.fullname}!`)
                navigate('/todo')
            }
        } catch (error) {
            dispatch(signInFailure(error.message));   
        }
    }
    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-3/4">
            <div className="flex justify-center items-center py-12"> 
                <div className="mx-auto grid w-[350px] md:w-[400px] gap-4"> 
                    <div className="text-center space-y-3 mb-5"> 
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4"> 
                        <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">

                            <Label  htmlFor="email">Email</Label>
                            <Input
                                ref={emailRef}
                                id="email"
                                onChange ={handleChange}
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            </div>
                            <div className="grid gap-2 mt-2"> 
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" ref={passwordRef} onChange ={handleChange} type="password" placeholder='********' required />
                            </div>
                            <Button type="submit" className="w-full mt-4 mb-2">
                            Login
                            </Button>
                            {/* <Button type="button" className="w-full bg-teal-400">
                            Login with Google
                            </Button> */}
                        </form>

                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/sign-up" className ="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block h-screen bg-muted">
                <img
                    src="https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=1280&h=854&dpr=1"
                    alt="Image"
                    className="h-screen w-full object-cover"
                />
            </div>
        </div>
    );
}
