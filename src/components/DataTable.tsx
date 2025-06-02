
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Column {
  header: string;
  accessor: keyof Task | ((task: Task) => React.ReactNode);
  width?: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: Task[];
  columns: Column[];
  onStatusChange: (id: string, newStatus: Task['status']) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onEdit,
  onView,
  onDelete
}) => {
  return (
    <div className="rounded-md border">
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
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
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
                        : column.accessor === 'dueDate'
                          ? format(new Date(row[column.accessor] as string), 'dd MMM yyyy')
                          : row[column.accessor] as string}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onView(row)}
                    >
                      <span className="sr-only">View</span>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onEdit(row)}
                    >
                      <span className="sr-only">Edit</span>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(row)}
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
