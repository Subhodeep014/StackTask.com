import React, { useEffect, useState } from 'react'

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
export default function Todo() {
    const {currentUser} = useSelector((state)=> state.user)
    const [userTodo, setUserTodo] = useState([]);
    const [todoIdToDelete, setTodoIdToDelete] = useState('');
    const [showMore, setShowMore] = useState(true);

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
                    if(res.data.length<9){
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
            const data = await res.json();
            if(res.ok){
                setUserPosts((prev)=>[...prev, ...data.posts]);
                if(data.posts.length<9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        } 
    }
  return (
    <div>
        <main className="gap-4 p-4 ">
            <div className="flex items-center mt-5 gap-2">
                {/* <Search className="left-96 h-4 w-4 text-muted-foreground" /> */}
                <Input
                type="text"
                placeholder="Add your task..."
                className="w-full rounded-lg bg-background pl-8 md:w-[336px]"
                />
                <Button>Add</Button>
            </div>
            <div className="mt-5">
                <Search className="relative top-7 left-2 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-lg bg-background pl-8"
                />
            </div>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Completed</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Newest first
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Oldest first</DropdownMenuCheckboxItem>
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
                        <TableRowTodo/>
                        <TableRowTodo/>
                        <TableRowTodo/>
                        <TableRowTodo/>
                        <TableRowTodo/>
                        <TableRowTodo/>
                        
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
    </div>
  )
}
