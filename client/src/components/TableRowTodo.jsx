import React, { useState } from 'react'
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
export default function TableRowTodo({task}) {
  
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (

    <TableRow className="p-0 m-0  bg-gray-100 dark:bg-slate-900">
      <TableCell className="sm:table-cell">
        <Checkbox checked={isChecked} onClick ={handleCheckboxChange} />
      </TableCell>
      <TableCell className={`min-w-60 p-0 m-0 font-medium ${isChecked ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
        Cycling with Amanda at 5pm
      </TableCell>
      <TableCell className="p-0 m-0 text-[11px] lg:text-[14px]">
      2023-07-12 10:42 AM
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>

  )
}
