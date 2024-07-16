import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BasicAppointment } from "@/schema/appointments";
import { PaginationState, RowData, Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TablePagination = ({
  table,
  pagination,
  setPagination
}: {
  table: Table<RowData>
  pagination: PaginationState
  setPagination: (value: PaginationState) => void
}) => {
  return <div className="flex items-center justify-end space-x-2 py-4">
    <div className="space-x-2 flex">
      <Button
        variant="pagination"
        size="paginationIcon"

        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      {table.getPageCount() < 5 ? (<>
        {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((el) => (
          <Button
            key={`5-btn-page-${el}`}
            variant="pagination"
            size="pagination"
            className={cn(
              pagination.pageIndex === el - 1 ? " bg-primary text-white" : ""
            )}
            onClick={() => setPagination({ ...pagination, pageIndex: el - 1 })}
          >
            {el}
          </Button>
        ))}
      </>) : (<>
        {pagination.pageIndex < 4 ? (<>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((el) => (
            <Button
              key={`4-btn-page-${el}`}
              variant="pagination"
              size="pagination"
              className={cn(
                pagination.pageIndex === el - 1 ? " bg-primary text-white" : ""
              )}
              onClick={() => setPagination({ ...pagination, pageIndex: el - 1 })}
            >
              {el}
            </Button>
          ))}
        </>) : <> {table.getPageCount() - 3 > pagination.pageIndex ? <>
          {Array.from({ length: 5 }, (_, i) => table.getState().pagination.pageIndex - 2 + i).map((el) => (
            <Button
              key={`3-btn-page-${el}`}
              variant="pagination"
              size="pagination"
              className={cn(
                pagination.pageIndex === el - 1 ? " bg-primary text-white" : ""
              )}
              onClick={() => setPagination({ ...pagination, pageIndex: el - 1 })}
            >
              {el}
            </Button>
          ))}
        </> : <>
          {Array.from({ length: 5 }, (_, i) => table.getPageCount() - 5 + i).map((el) => (
            <Button
              key={`total-btn-page-${el}`}
              variant="pagination"
              size="pagination"
              className={cn(
                pagination.pageIndex === el - 1 ? " bg-primary text-white" : ""
              )}
              onClick={() => setPagination({ ...pagination, pageIndex: el - 1 })}
            >
              {el}
            </Button>
          ))}
        </>}
        </>}
        {table.getPageCount() - 3 > pagination.pageIndex && <span className="text-primary fw-[700]">...</span>}
        <Button
          variant="pagination"
          size="pagination"
          className={cn(
            pagination.pageIndex === table.getPageCount() - 1 ? " bg-primary text-white" : ""
          )}
          onClick={() => table.lastPage()}
        >
          {table.getPageCount().toLocaleString()}
        </Button>
      </>)}
      <Button
        variant="pagination"
        size="paginationIcon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  </div>;
};

export {
  TablePagination
}