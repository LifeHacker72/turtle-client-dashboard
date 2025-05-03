
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { Calendar, User, UserCheck } from 'lucide-react';

interface TaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  task,
  isOpen,
  onClose,
  onEdit
}) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.task}</DialogTitle>
          <DialogDescription className="pt-2">
            <StatusBadge status={task.status} interactive={false} />
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {task.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Client</h4>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <span>{task.client}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Owner</h4>
              <div className="flex items-center gap-2 mt-1">
                <UserCheck className="h-4 w-4 text-gray-400" />
                <span>{task.owner}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Advisor</h4>
              <p className="mt-1">{task.advisor}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{format(new Date(task.dueDate), 'dd MMMM yyyy')}</span>
              </div>
            </div>
            
            {task.meetingId && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Meeting ID</h4>
                <p className="mt-1">{task.meetingId}</p>
              </div>
            )}
            
            {task.meetingNumber !== undefined && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Meeting Number</h4>
                <p className="mt-1">{task.meetingNumber}</p>
              </div>
            )}
            
            {task.priority && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                <p className="mt-1 font-medium">
                  {task.priority === 'high' && (
                    <span className="text-red-600">High</span>
                  )}
                  {task.priority === 'medium' && (
                    <span className="text-yellow-600">Medium</span>
                  )}
                  {task.priority === 'low' && (
                    <span className="text-green-600">Low</span>
                  )}
                </p>
              </div>
            )}
            
            {task.createdAt && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                <p className="mt-1">{format(new Date(task.createdAt), 'dd MMM yyyy')}</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => onEdit(task)}>
            Edit Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
