
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
  hideClient?: boolean;
  ownerLabel?: string;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  task,
  isOpen,
  onClose,
  onEdit,
  hideClient = false,
  ownerLabel = "Owner"
}) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.task}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {task.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1">{task.description}</p>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
            <div className="w-24">
              <StatusBadge status={task.status} interactive={false} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {!hideClient && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Client</h4>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{task.client}</span>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">{ownerLabel}</h4>
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
