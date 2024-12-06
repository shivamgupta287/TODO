"use client";

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
import { useEffect, useState, useCallback } from "react";
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

export default function TaskPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortDirection, setSortDirection] =
    useState<`${string}-${"asc" | "desc"}`>("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<"title" | "status" | "priority">(
    "title"
  );

  const uniqueStatuses = Array.from(new Set(tasks.map((task) => task.status)));
  const uniquePriorities = Array.from(
    new Set(tasks.map((task) => task.priority))
  );

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: rowsPerPage.toString(),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(sortDirection && { sort: sortDirection }),
      });

      const response = await fetch(`/api/todoList?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, rowsPerPage, statusFilter, priorityFilter, sortDirection]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchTasks();
    }
  }, [mounted, currentPage, rowsPerPage, statusFilter, priorityFilter]);

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1);
    const params = new URLSearchParams({
      page: "1",
      limit: rowsPerPage.toString(),
      ...(status && { status }),
    });
    fetchTasks();
  };

  const handleSort = async (
    direction: "asc" | "desc",
    column: "title" | "status" | "priority"
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: rowsPerPage.toString(),
        sort: direction,
        sortColumn: column,
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });

      const response = await fetch(`/api/todoList?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
        setSortDirection(`${column}-${direction}`);
        setSortColumn(column);
      }
    } catch (error) {
      console.error("Failed to sort tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handlePriorityFilter = (priority: string | null) => {
    setPriorityFilter(priority);
    setCurrentPage(1);
    const params = new URLSearchParams({
      page: "1",
      limit: rowsPerPage.toString(),
      ...(priority && { priority }),
    });
    fetchTasks();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Welcome Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Welcome back!</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Here's a list of your tasks for this month!
            </p>
          </div>
          <button className="rounded-full bg-background size-8 flex items-center justify-center border border-border/40">
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
        <div className="flex items-center gap-2 mt-6">
          <Input
            placeholder="Filter tasks..."
            className="max-w-[200px] h-9 bg-background border-border/40"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 border-border/40 bg-background hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {uniqueStatuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {status === "In Progress" && (
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
                    {status === "Backlog" && (
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
                    {status === "Todo" && (
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
                    {status}
                  </div>
                </DropdownMenuItem>
              ))}
              {statusFilter && (
                <DropdownMenuItem
                  onClick={() => handleStatusFilter(null)}
                  className="flex items-center gap-2 border-t"
                >
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
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Clear Filter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 border-border/40 bg-background hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  Priority
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {uniquePriorities.map((priority) => (
                <DropdownMenuItem
                  key={priority}
                  onClick={() => handlePriorityFilter(priority)}
                  className="flex items-center justify-between"
                >
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
                      {priority === "High" ? (
                        <path d="m12 19-7-7 7-7" />
                      ) : (
                        <path d="M5 12h14" />
                      )}
                    </svg>
                    {priority}
                  </div>
                </DropdownMenuItem>
              ))}
              {priorityFilter && (
                <DropdownMenuItem
                  onClick={() => handlePriorityFilter(null)}
                  className="flex items-center gap-2 border-t"
                >
                  Clear Filter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="ml-auto">
            <Button
              variant="outline"
              className="h-9 border-border/40 bg-background hover:bg-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
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

      {/* Task Table */}
      <div className="p-8 pt-4">
        <div className="rounded-lg border border-border/40 bg-background">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="w-[30px]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border border-border/40"
                  />
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-2">Task</div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-2">
                    Title
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleSort(
                          sortDirection === `title-asc` ? "desc" : "asc",
                          "title"
                        )
                      }
                      disabled={loading}
                    >
                      {sortDirection === `title-asc` ? (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      ) : (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 15 6-6 6 6" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-2">
                    Status
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleSort(
                          sortDirection === `status-asc` ? "desc" : "asc",
                          "status"
                        )
                      }
                      disabled={loading}
                    >
                      {sortDirection === `status-asc` ? (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      ) : (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 15 6-6 6 6" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-2">
                    Priority
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleSort(
                          sortDirection === `priority-asc` ? "desc" : "asc",
                          "priority"
                        )
                      }
                      disabled={loading}
                    >
                      {sortDirection === `priority-asc` ? (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      ) : (
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
                          className={`text-muted-foreground ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          <path d="m6 15 6-6 6 6" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="w-[30px]">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-sm border border-border/40"
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
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>{totalItems} total tasks</div>
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              className="bg-background border border-border/40 rounded px-2 py-1"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-border/40"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-border/40"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-border/40"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-border/40"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
