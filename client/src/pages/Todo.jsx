import React, { useEffect, useRef, useState } from 'react'

import {
    ListFilter,
    Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TableRowTodo from '@/components/TableRowTodo'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Todo() {
    const todoRef = useRef();
    const {currentUser} = useSelector((state)=> state.user)
    const [userTodo, setUserTodo] = useState([]);
    const [todoIdToDelete, setTodoIdToDelete] = useState('');
    const [showMore, setShowMore] = useState(true);
    const [addTodo, setAddTodo] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOrderAsc, setFilterOrderAsc] = useState(true)
    useEffect(()=>{
        const fetchTodos = async()=>{
            try {
                const res = await axios.get(`/api/todo/get/`,{
                    headers: { 'Content-Type': 'application/json' }
                })
                console.log(res)
                const data = await res.data;
                
                if(data){
                    setUserTodo(data)
                    console.log(userTodo)
                    if(data.length<9){
                        setShowMore(false)
                    }
                }
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchTodos();
        console.log(userTodo)
        
    },[currentUser._id])
    const handleShowMore = async()=>{
        const startIndex = userTodo.length;
        try {
            const res = await axios.get(`/api/todo/get?startIndex=${startIndex}`);
            const data = await res.data;
            if(res.status === 200){
              const newDataArray = Object.keys(data).map(key => data[key]);
              if(newDataArray.length<9){
                setShowMore(false)
              }else{
                setShowMore(true);
              }
              setUserTodo(prevUserTodo => [...prevUserTodo, ...newDataArray]);
            }
        } catch (error) {
            console.log(error);
        } 
    }
    const fetchTodos = async()=>{
      let startIndex = 0;
      try {
        const res = await axios.get(`/api/todo/get?startIndex=${startIndex}`,{
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(res)
        const data = await res.data;
        
        if(data){
            setUserTodo(data)
            startIndex=userTodo.length
            console.log(userTodo)
            if(data.length>=9){
                setShowMore(true)
            }
        }
        
    } catch (error) {
        console.log(error.message)
    }
    }
    const handleChange = async(e)=>{
        setAddTodo({[e.target.id]: e.target.value})

    }
    const handleClick = async()=>{
        if (todoRef.current) todoRef.current.value = '';
        todoRef.current.focus()

        try {
            const res = await axios.post('/api/todo/create', addTodo ,{
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.data;
            console.log(data)
            
            if(res.status === 200){
                toast.success("Task added into you list!")
                setUserTodo([...userTodo, data])
                if(userTodo.length>=9){
                  setShowMore(true);
                }
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
  const handleSearch = async()=>{
    const startIndex = userTodo.length;
    if(searchTerm!==''){
      try {
        const res = await axios.get(`/api/todo/get?startIndex=${0}&searchTerm=${searchTerm}`);
        const data = await res.data;
        if(res.status === 200){
          // const newDataArray = Object.keys(data).map(key => data[key]);
          setUserTodo(data);
          if(data.length<9){
              setShowMore(false);
          }
        }
    } catch (error) {
        console.log(error);
    } 
    }
  }
  const searchAsc = () => {
    setFilterOrderAsc(true);
    const sortedTodos = [...userTodo].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setUserTodo(sortedTodos);
  };

  const searchDesc = () => {
    setFilterOrderAsc(false);
    const sortedTodos = [...userTodo].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setUserTodo(sortedTodos);
  };
  
  return (
    <div>
        <main className="gap-4 p-4 ">
            <div className="flex items-center mt-5 gap-2">
                {/* <Search className="left-96 h-4 w-4 text-muted-foreground" /> */}
                <Input
                id='name'
                onChange = {handleChange}
                ref={todoRef}
                type="text"
                placeholder="Add your task..."
                className="w-full rounded-lg bg-background pl-8 md:w-[336px]"
                />
                <Button onClick = {handleClick}>Add</Button>
            </div>
            <div className="mt-5 flex items-center">
                <Search className="relative top-0 left-6 h-4 w-4 text-muted-foreground" />
                <Input
                id="search"
                value = {searchTerm}
                onChange = {(e)=>setSearchTerm(e.target.value)}
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-lg bg-background pl-8"
                />
                <Button className = "ml-2 w-16 h-8" onClick = {handleSearch}>Search</Button>
            </div>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger onClick = {fetchTodos} value="all">All</TabsTrigger>
                <TabsTrigger onClick = {fetchTodos} value="active">Active</TabsTrigger>
                <TabsTrigger onClick = {fetchTodos} value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button  variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem onClick = {searchAsc} checked={filterOrderAsc}>
                      Newest first
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick = {searchDesc} checked={!filterOrderAsc}>Oldest first</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>
                    Manage your tasks and view their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-slate-200 dark:bg-sky-950">
                      <TableRow className = "p-0 m-0" >
                        <TableHead className="p-3 m-0">Task</TableHead>
                        <TableHead className="p-0 m-0">Name</TableHead>
                        <TableHead className="p-0 m-0">Created At</TableHead>
                        <TableHead className="p-0 m-0">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userTodo.length>0  && userTodo.map(todo=>(
                            <TableRowTodo key={todo._id} task={todo} setUserTodo = {setUserTodo} userTodo = {userTodo}/>
                        ))}                        
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>
                    Manage your tasks and view their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-slate-200 dark:bg-sky-950">
                      <TableRow className = "p-0 m-0" >
                        <TableHead className="p-3 m-0">Task</TableHead>
                        <TableHead className="p-0 m-0">Name</TableHead>
                        <TableHead className="p-0 m-0">Created At</TableHead>
                        <TableHead className="p-0 m-0">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userTodo.length>0  && userTodo.map(todo=> todo.completed===false &&(
                            <TableRowTodo key={todo._id} task={todo} setUserTodo = {setUserTodo} userTodo = {userTodo}/>
                        ))}                        
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>
                    Manage your tasks and view their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-slate-200 dark:bg-sky-950">
                      <TableRow className = "p-0 m-0" >
                        <TableHead className="p-3 m-0">Task</TableHead>
                        <TableHead className="p-0 m-0">Name</TableHead>
                        <TableHead className="p-0 m-0">Created At</TableHead>
                        <TableHead className="p-0 m-0">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userTodo.length>0  && userTodo.map(todo=> todo.completed &&(
                            <TableRowTodo key={todo._id} task={todo} setUserTodo = {setUserTodo} userTodo = {userTodo}/>
                        ))}                        
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {showMore && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleShowMore}>
              Show More
            </Button>
          </div>
        )}
        </main>
    </div>
  )
}
