import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TaskFiltersProps {
  uniqueStatuses: string[];
  uniquePriorities: string[];
  statusFilter: string | null;
  priorityFilter: string | null;
  handleStatusFilter: (status: string | null) => void;
  handlePriorityFilter: (priority: string | null) => void;
}

export function TaskFilters({
  uniqueStatuses,
  uniquePriorities,
  statusFilter,
  priorityFilter,
  handleStatusFilter,
  handlePriorityFilter,
}: TaskFiltersProps) {
  return (
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
  );
}
