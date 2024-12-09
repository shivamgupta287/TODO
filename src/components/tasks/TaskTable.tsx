import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
  sortDirection: `${string}-${"asc" | "desc"}`;
  handleSort: (
    direction: "asc" | "desc",
    column: "title" | "status" | "priority"
  ) => void;
}

interface Task {
  id: string;
  type: string;
  title: string;
  status: string;
  priority: string;
}

export function TaskTable({
  tasks,
  loading,
  sortDirection,
  handleSort,
}: TaskTableProps) {
  return (
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
    </div>
  );
}
