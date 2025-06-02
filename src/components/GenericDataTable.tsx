
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
  render?: (value: any) => React.ReactNode;
}

interface GenericDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
}

const GenericDataTable = <T extends { id: string }>({
  data,
  columns,
  onEdit,
  onView,
  onDelete,
  showActions = true
}: GenericDataTableProps<T>) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index} 
                className={column.width ? column.width : ""}
              >
                {column.header}
              </TableHead>
            ))}
            {showActions && <TableHead className="w-[120px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="h-24 text-center">
                No results found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow 
                key={row.id} 
                className="transition-all hover:bg-muted/30 group"
              >
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : column.render 
                        ? column.render(row[column.accessor])
                        : String(row[column.accessor])}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell>
                    <div className="flex gap-1">
                      {onView && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onView(row)}
                        >
                          <span className="sr-only">View</span>
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onEdit(row)}
                        >
                          <span className="sr-only">Edit</span>
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => onDelete(row)}
                        >
                          <span className="sr-only">Delete</span>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenericDataTable;
