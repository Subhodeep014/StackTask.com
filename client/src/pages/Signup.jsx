import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
    console.log(formData)
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.fullname){
      toast.error('Please fill out all feilds');
      return setErrorMessage('Please fill out all feilds');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data= await res.json();
      console.log(data)
      if(data.success===false){
        toast.error(data.message);
        setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        toast.success("Succesfully signed up");
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error(error.messgage);
      setLoading(false);
    }
  }
    return (
        <Card className="mx-auto max-w-sm md:max-w-md mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-4"> 
                  <Label value="Your name">Full Name</Label>
                  <Input id="fullname" onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="grid gap-2">
                  <Label value="Your email">Email</Label>
                  <Input
                    id="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label value='Your password'>Password</Label>
                  <Input id="password" onChange={handleChange} type="password" />
                </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {
                      loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please Wait
                        </>
                      ) : 'Create an account'
                    }
                  </Button>
                  <Button disabled={loading} type='button' variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to='/sign-in' className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
    )
}
