import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
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
export default function Todo() {
  return (
    <div>
        <main className="gap-4 p-4 ">
            <div className="flex items-center mt-5 gap-2">
                {/* <Search className="left-96  h-4 w-4 text-muted-foreground" /> */}
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
                    <TableHeader>
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
