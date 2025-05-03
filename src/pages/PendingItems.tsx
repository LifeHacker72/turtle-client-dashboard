
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PendingItems: React.FC = () => {
  // Placeholder data for pending tasks - similar to advisory-dashboard-nexus format
  const pendingTasks = [
    { 
      id: '1', 
      title: 'Insurance Document Review', 
      assignedTo: 'Priya Sharma', 
      dueDate: '2025-05-10', 
      status: 'Pending',
      priority: 'High',
      description: 'Review updated insurance policy documents for compliance with financial regulations.'
    },
    { 
      id: '2', 
      title: 'Tax Planning Session', 
      assignedTo: 'Rajesh Patel', 
      dueDate: '2025-05-15', 
      status: 'In Progress',
      priority: 'Medium',
      description: 'Prepare tax planning strategies for the upcoming fiscal year.'
    },
    { 
      id: '3', 
      title: 'Portfolio Rebalancing', 
      assignedTo: 'Vikram Singh', 
      dueDate: '2025-05-20', 
      status: 'Not Started',
      priority: 'Low',
      description: 'Analyze and rebalance investment portfolio based on market conditions.'
    },
    { 
      id: '4', 
      title: 'Retirement Planning Review', 
      assignedTo: 'Aisha Khan', 
      dueDate: '2025-05-22', 
      status: 'Pending',
      priority: 'High',
      description: 'Annual review of retirement planning goals and current progress.'
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">In Progress</Badge>;
      case 'Not Started':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pending Items</h1>
        <Button variant="outline">View All Tasks</Button>
      </div>
      
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Your Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-500 px-2">
              <div className="col-span-4 md:col-span-3">Task</div>
              <div className="hidden md:block md:col-span-2">Assigned To</div>
              <div className="col-span-3 md:col-span-2">Due Date</div>
              <div className="col-span-3 md:col-span-2">Status</div>
              <div className="col-span-2 md:col-span-2">Priority</div>
              <div className="hidden md:block md:col-span-1">Action</div>
            </div>
            
            <Separator />
            
            {pendingTasks.map((task) => (
              <div key={task.id} className="hover:bg-gray-50 rounded-md transition-colors">
                <div className="grid grid-cols-12 gap-2 items-center py-3 px-2">
                  <div className="col-span-4 md:col-span-3">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500 md:hidden truncate">{task.assignedTo}</p>
                  </div>
                  <div className="hidden md:block md:col-span-2 text-sm">{task.assignedTo}</div>
                  <div className="col-span-3 md:col-span-2 text-sm">{new Date(task.dueDate).toLocaleDateString()}</div>
                  <div className="col-span-3 md:col-span-2">{getStatusBadge(task.status)}</div>
                  <div className="col-span-2 md:col-span-2">{getPriorityBadge(task.priority)}</div>
                  <div className="hidden md:flex md:col-span-1 justify-end">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">View task</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingItems;
