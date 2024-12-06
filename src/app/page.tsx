'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  type: string;
  title: string;
  status: string;
  priority: string;
}

const initialTasks: Task[] = [
  {
    id: "TASK-A",
    type: "Documentation",
    title: "Description of Task A",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-B",
    type: "Documentation",
    title: "Description of Task B",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-C",
    type: "Bug",
    title: "Description of Task C",
    status: "Todo",
    priority: "High",
  },
];

export default function TaskPage() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSort = (direction: 'asc' | 'desc') => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (direction === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setTasks(sortedTasks);
    setSortDirection(direction);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground mt-1">
              Here's a list of your tasks for this month!
            </p>
          </div>
          <button className="rounded-full bg-background size-10 flex items-center justify-center border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-8">
          <Input 
            placeholder="Filter tasks..." 
            className="max-w-xs bg-background"
          />
          <Button 
            variant="outline" 
            className="bg-background border-border hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center gap-2">
              Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="bg-background border-border hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center gap-2">
              Priority
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </div>
          </Button>
          <div className="ml-auto">
            <Button variant="outline" className="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              View
            </Button>
          </div>
        </div>
      </div>

      {/* Existing Task Table */}
      <div className="p-8 pt-4">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30px]">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded-sm border border-input"
                  />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 hover:text-accent-foreground">
                      Title
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort('asc')}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="m3 8 4-4 4 4"/>
                          <path d="M7 4v16"/>
                          <path d="M11 12h10"/>
                          <path d="M11 16h7"/>
                          <path d="M11 20h4"/>
                          <path d="M11 8h13"/>
                        </svg>
                        Sort A to Z
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort('desc')}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="m3 16 4 4 4-4"/>
                          <path d="M7 20V4"/>
                          <path d="M11 12h10"/>
                          <path d="M11 16h7"/>
                          <path d="M11 20h4"/>
                          <path d="M11 8h13"/>
                        </svg>
                        Sort Z to A
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-muted/50">
                  <TableCell className="w-[30px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded-sm border border-input"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary/50">
                        {task.type}
                      </Badge>
                      <span className="font-medium">{task.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {task.status === "In Progress" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <line x1="10" x2="14" y1="2" y2="2" />
                          <line x1="12" x2="15" y1="14" y2="11" />
                          <circle cx="12" cy="14" r="8" />
                        </svg>
                      )}
                      {task.status === "Backlog" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      )}
                      {task.status === "Todo" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                      <span>{task.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        {task.priority === "High" ? (
                          <path d="m12 19-7-7 7-7" />
                        ) : (
                          <path d="M5 12h14" />
                        )}
                      </svg>
                      <span>{task.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
