
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PendingItems: React.FC = () => {
  // Placeholder data for pending tasks
  const pendingTasks = [
    { id: '1', title: 'Insurance Document Review', assignedTo: 'Priya Sharma', dueDate: '2025-05-10', priority: 'High' },
    { id: '2', title: 'Tax Planning Session', assignedTo: 'Rajesh Patel', dueDate: '2025-05-15', priority: 'Medium' },
    { id: '3', title: 'Portfolio Rebalancing', assignedTo: 'Vikram Singh', dueDate: '2025-05-20', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Pending Items</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 font-medium text-sm text-gray-500">
              <div className="col-span-5 md:col-span-4">Task</div>
              <div className="col-span-4 md:col-span-3">Assigned To</div>
              <div className="col-span-3 md:col-span-3">Due Date</div>
              <div className="hidden md:block md:col-span-2">Priority</div>
            </div>
            
            <Separator />
            
            {pendingTasks.map((task) => (
              <React.Fragment key={task.id}>
                <div className="grid grid-cols-12 items-center py-1">
                  <div className="col-span-5 md:col-span-4 font-medium">{task.title}</div>
                  <div className="col-span-4 md:col-span-3 text-sm">{task.assignedTo}</div>
                  <div className="col-span-3 md:col-span-3 text-sm">{new Date(task.dueDate).toLocaleDateString()}</div>
                  <div className="hidden md:block md:col-span-2">
                    <span 
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingItems;
