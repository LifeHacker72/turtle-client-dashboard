
export interface Task {
  id: string;
  task: string;
  client: string;
  advisor: string;
  owner: string;
  status: 'pending' | 'overdue' | 'completed';
  dueDate: string;
  meetingId?: string;
  meetingNumber?: number;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string;
}

export type TaskStatus = 'pending' | 'overdue' | 'completed';
export type GroupByOption = 'none' | 'owner' | 'dueDate' | 'advisor' | 'client';
export type ViewMode = 'table' | 'card';
