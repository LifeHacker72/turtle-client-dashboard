
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface StatusBadgeProps {
  status: TaskStatus;
  onStatusChange?: (newStatus: TaskStatus) => void;
  interactive?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  onStatusChange,
  interactive = true
}) => {
  const { toast } = useToast();
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
      toast({
        title: "Status Updated",
        description: `Task status changed to ${newStatus}`,
      });
    }
  };

  if (!interactive) {
    return renderBadge(status);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderBadge(status)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
          <Clock className="mr-2 h-4 w-4 text-blue-500" />
          <span>Pending</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('overdue')}>
          <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
          <span>Overdue</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
          <span>Completed</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function renderBadge(status: TaskStatus) {
  switch (status) {
    case 'pending':
      return (
        <Badge 
          variant="outline" 
          className={cn(
            "bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1 cursor-pointer"
          )}
        >
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
      );
    case 'overdue':
      return (
        <Badge 
          variant="outline" 
          className={cn(
            "bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1 cursor-pointer"
          )}
        >
          <AlertCircle className="h-3 w-3" />
          <span>Overdue</span>
        </Badge>
      );
    case 'completed':
      return (
        <Badge 
          variant="outline" 
          className={cn(
            "bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 cursor-pointer"
          )}
        >
          <CheckCircle2 className="h-3 w-3" />
          <span>Completed</span>
        </Badge>
      );
    default:
      return null;
  }
}

export default StatusBadge;
