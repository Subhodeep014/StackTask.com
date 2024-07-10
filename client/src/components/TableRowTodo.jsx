import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import {
  MoreHorizontal,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { comment } from 'postcss'
import DialogBox from './DialogBox'
export default function TableRowTodo({task, setUserTodo, userTodo}) {
  const [user, setUser] = useState({});
  const {currentUser} = useSelector(state=> state.user)
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task?.name);
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await axios.get(`/api/auth/${task.userId}`)
        const data = await res.data;
        if(res.status ===200){
          setUser(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, [task])
  
  const handleEdit = ()=>{
    setIsEditing(true);
    setEditedContent(task.name)
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    // Format the date
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    
    // Format the time
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    hours = ('0' + hours).slice(-2);
    
    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
    
    return formattedDate;
  };

  const handleDelete = async()=>{
    
  }
  return (
    <>
      <TableRow className="p-0 m-0 bg-gray-100 dark:bg-slate-900">
        <TableCell className="sm:table-cell">
          <Checkbox checked={isChecked} onClick={handleCheckboxChange} />
        </TableCell>
        <TableCell className={`min-w-36 p-0 m-0 text-[12px] sm:text-[14px] ${isChecked ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
          {task.name}
        </TableCell>
        <TableCell className="p-0 m-0 text-[11px] lg:text-[14px]">
          {formatDate(task.createdAt)}
        </TableCell>
        <TableCell className="p-0 m-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick = {handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {isEditing && (
        <DialogBox
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          task={task}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          setUserTodo = {setUserTodo}
          userTodo = {userTodo}
        />
      )}
    </>
  );
}
