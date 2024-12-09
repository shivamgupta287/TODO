import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export function Pagination({
  totalItems,
  rowsPerPage,
  currentPage,
  totalPages,
  handlePageChange,
  handleRowsPerPageChange,
}: PaginationProps) {
  return (
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
  );
}
