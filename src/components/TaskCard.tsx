
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { Edit, Eye, Trash2, User, UserCheck, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, newStatus: Task['status']) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onEdit,
  onView,
  onDelete
}) => {
  return (
    <Card className="transition-all border hover:border-[#2edebe] group">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <StatusBadge 
            status={task.status} 
            onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)} 
          />
          {task.priority && (
            <div className="text-sm font-medium">
              {task.priority === 'high' && (
                <span className="text-red-600">High Priority</span>
              )}
              {task.priority === 'medium' && (
                <span className="text-yellow-600">Medium Priority</span>
              )}
              {task.priority === 'low' && (
                <span className="text-green-600">Low Priority</span>
              )}
            </div>
          )}
        </div>
        
        <h3 className="mt-2 font-medium text-lg truncate group-hover:text-[#2edebe] cursor-pointer" onClick={() => onView(task)}>
          {task.task}
        </h3>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span>Client:</span>
            <span className="font-medium">{task.client}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-gray-400" />
            <span>Owner:</span>
            <span className="font-medium">{task.owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Due:</span>
            <span className={cn("font-medium", 
              task.status === 'overdue' ? "text-red-600" : ""
            )}>
              {format(new Date(task.dueDate), 'dd MMM yyyy')}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onView(task)}
        >
          <span className="sr-only">View</span>
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onEdit(task)}
        >
          <span className="sr-only">Edit</span>
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(task)}
        >
          <span className="sr-only">Delete</span>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
