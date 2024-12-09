"use client";

import { useEffect, useState, useCallback } from "react";
import { TaskTable } from "@/components/tasks/TaskTable";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { Pagination } from "@/components/tasks/Pagination";

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
    fetchTasks();
  };

  const handleTaskAdded = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TaskHeader onTaskAdded={handleTaskAdded} />

      <TaskFilters
        uniqueStatuses={["Todo", "In Progress", "Done", "Backlog"]}
        uniquePriorities={["High", "Medium", "Low"]}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        handleStatusFilter={handleStatusFilter}
        handlePriorityFilter={handlePriorityFilter}
      />

      <TaskTable
        tasks={tasks}
        loading={loading}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />

      <Pagination
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
