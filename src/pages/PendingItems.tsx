
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Task, TaskStatus, GroupByOption, ViewMode } from '@/types/task';
import { useToast } from '@/hooks/use-toast';
import DataTable from '@/components/DataTable';
import TaskCard from '@/components/TaskCard';
import TaskDialog from '@/components/TaskDialog';
import TaskFormDialog from '@/components/TaskFormDialog';
import ConfirmDialog from '@/components/ConfirmDialog';
import { CheckCircle2, AlertCircle, Clock, LayoutGrid, LayoutList, Plus, Search } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

// Sample task data
const taskData: Task[] = [
  {
    id: '1',
    task: 'Review Financial Statement',
    client: 'Vijay Malhotra',
    advisor: 'Priya Sharma',
    owner: 'Rajesh Patel',
    status: 'overdue',
    dueDate: '2025-05-01',
    description: 'Review quarterly financial statements and provide feedback on investment performance.',
    priority: 'high',
    createdAt: '2025-04-15T10:30:00Z'
  },
  {
    id: '2',
    task: 'Update Insurance Documentation',
    client: 'Ananya Singh',
    advisor: 'Vikram Singh',
    owner: 'Priya Sharma',
    status: 'pending',
    dueDate: '2025-05-10',
    description: 'Update client insurance documentation with new policy details.',
    priority: 'medium',
    createdAt: '2025-04-20T14:15:00Z'
  },
  {
    id: '3',
    task: 'Prepare Tax Planning Session',
    client: 'Rajesh Kumar',
    advisor: 'Anjali Desai',
    owner: 'Aisha Khan',
    status: 'pending',
    dueDate: '2025-05-15',
    description: 'Prepare materials and agenda for upcoming tax planning session.',
    meetingId: 'MTG-2025-05',
    meetingNumber: 3,
    priority: 'medium',
    createdAt: '2025-04-22T09:00:00Z'
  },
  {
    id: '4',
    task: 'Portfolio Rebalancing Review',
    client: 'Arjun Mehta',
    advisor: 'Priya Sharma',
    owner: 'Vikram Singh',
    status: 'completed',
    dueDate: '2025-04-30',
    description: 'Complete quarterly portfolio rebalancing review and adjustment recommendations.',
    priority: 'high',
    createdAt: '2025-04-10T11:45:00Z'
  },
  {
    id: '5',
    task: 'Client Follow-up Call',
    client: 'Neha Kapoor',
    advisor: 'Meera Kapoor',
    owner: 'Rajesh Patel',
    status: 'pending',
    dueDate: '2025-05-08',
    description: 'Follow up with client regarding recent financial recommendations and answer questions.',
    priority: 'low',
    createdAt: '2025-04-25T16:30:00Z'
  },
  {
    id: '6',
    task: 'Retirement Planning Analysis',
    client: 'Sanjay Gupta',
    advisor: 'Anjali Desai',
    owner: 'Priya Sharma',
    status: 'completed',
    dueDate: '2025-04-28',
    description: 'Complete retirement planning analysis and prepare presentation for client meeting.',
    meetingId: 'MTG-2025-04',
    meetingNumber: 2,
    priority: 'high',
    createdAt: '2025-04-05T13:20:00Z'
  },
  {
    id: '7',
    task: 'Estate Planning Document Review',
    client: 'Kiran Patel',
    advisor: 'Vikram Singh',
    owner: 'Aisha Khan',
    status: 'overdue',
    dueDate: '2025-04-25',
    description: 'Review and update estate planning documents based on recent legislative changes.',
    priority: 'medium',
    createdAt: '2025-04-01T10:00:00Z'
  },
];

const PendingItems: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(taskData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [groupBy, setGroupBy] = useState<GroupByOption>('none');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      overdue: tasks.filter(task => task.status === 'overdue').length,
      completed: tasks.filter(task => task.status === 'completed').length,
    };
  }, [tasks]);

  // Filter tasks based on search query and selected status
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = 
        searchQuery === '' || 
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.advisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.owner.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, selectedStatus]);

  // Group tasks if grouping is selected
  const groupedTasks = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Tasks': filteredTasks };
    }

    const groups: Record<string, Task[]> = {};
    
    filteredTasks.forEach(task => {
      let groupKey = '';
      
      if (groupBy === 'dueDate') {
        groupKey = format(new Date(task.dueDate), 'MMM dd, yyyy');
      } else if (groupBy === 'owner' || groupBy === 'advisor' || groupBy === 'client') {
        groupKey = task[groupBy];
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(task);
    });
    
    return groups;
  }, [filteredTasks, groupBy]);

  const tableColumns = [
    {
      header: 'Task',
      accessor: 'task',
      width: 'w-[250px]'
    },
    {
      header: 'Client',
      accessor: 'client',
    },
    {
      header: 'Owner',
      accessor: 'owner',
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
    },
    {
      header: 'Status',
      accessor: (task: Task) => (
        <StatusBadge 
          status={task.status} 
          onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)} 
        />
      ),
    },
  ];

  // Task handlers
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const handleOpenTaskDialog = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleOpenEditDialog = (task: Task) => {
    setSelectedTask(task);
    setIsFormDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedTask(null);
    setIsFormDialogOpen(true);
  };

  const handleConfirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
      
      toast({
        title: "Task Deleted",
        description: "The task has been successfully deleted",
      });
      
      setTaskToDelete(null);
    }
  };

  const handleSaveTask = (taskData: Task) => {
    if (tasks.some(t => t.id === taskData.id)) {
      // Update existing task
      setTasks(prev => 
        prev.map(task => 
          task.id === taskData.id ? taskData : task
        )
      );
    } else {
      // Add new task
      setTasks(prev => [...prev, taskData]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pending Items</h1>
          <p className="text-gray-500">Manage and track tasks</p>
        </div>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Task
        </Button>
      </div>
      
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedStatus === 'all' && "border-[#2edebe] ring-2 ring-[#2edebe]/20"
          )}
          onClick={() => setSelectedStatus('all')}
        >
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">All Tasks</p>
              <h3 className="text-2xl font-bold">{statusCounts.all}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedStatus === 'overdue' && "border-[#2edebe] ring-2 ring-[#2edebe]/20"
          )}
          onClick={() => setSelectedStatus('overdue')}
        >
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <h3 className="text-2xl font-bold">{statusCounts.overdue}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedStatus === 'completed' && "border-[#2edebe] ring-2 ring-[#2edebe]/20"
          )}
          onClick={() => setSelectedStatus('completed')}
        >
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold">{statusCounts.completed}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupByOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Grouping</SelectItem>
              <SelectItem value="owner">Group by Owner</SelectItem>
              <SelectItem value="dueDate">Group by Due Date</SelectItem>
              <SelectItem value="advisor">Group by Advisor</SelectItem>
              <SelectItem value="client">Group by Client</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              className="w-10"
              onClick={() => setViewMode('table')}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              className="w-10"
              onClick={() => setViewMode('card')}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Card View</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tasks display */}
      {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
        <div key={groupName} className="mt-6">
          {groupBy !== 'none' && (
            <h3 className="font-medium text-lg mb-4">{groupName} ({groupTasks.length})</h3>
          )}
          
          {viewMode === 'table' ? (
            <DataTable
              data={groupTasks}
              columns={tableColumns}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEditDialog}
              onView={handleOpenTaskDialog}
              onDelete={handleConfirmDelete}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={handleOpenEditDialog}
                  onView={handleOpenTaskDialog}
                  onDelete={handleConfirmDelete}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Task detail dialog */}
      <TaskDialog
        task={selectedTask}
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onEdit={(task) => {
          setIsTaskDialogOpen(false);
          setTimeout(() => handleOpenEditDialog(task), 100);
        }}
      />
      
      {/* Task form dialog */}
      <TaskFormDialog
        task={selectedTask}
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSave={handleSaveTask}
      />
      
      {/* Confirm delete dialog */}
      <ConfirmDialog
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleDeleteTask}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default PendingItems;
