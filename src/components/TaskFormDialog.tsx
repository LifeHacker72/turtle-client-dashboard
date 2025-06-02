
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/task';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface TaskFormDialogProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  hideClient?: boolean;
  hideAdvisor?: boolean;
  hideOwner?: boolean;
  hidePriority?: boolean;
  defaultClient?: string;
  advisorsList?: string[];
  defaultOwner?: string;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  hideClient = false,
  hideAdvisor = false,
  hideOwner = false,
  hidePriority = false,
  defaultClient = '',
  advisorsList = [],
  defaultOwner = ''
}) => {
  const { toast } = useToast();
  const isEditing = !!task;
  
  const form = useForm<Task>({
    defaultValues: task || {
      id: String(Date.now()),
      task: '',
      client: defaultClient || '',
      advisor: '',
      owner: defaultOwner || '',
      status: 'pending',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    }
  });
  
  const onSubmit = (data: Task) => {
    onSave({
      ...data,
      id: task?.id || String(Date.now()),
      owner: defaultOwner || data.owner,
      client: defaultClient || data.client
    });
    
    toast({
      title: isEditing ? "Task Updated" : "Task Created",
      description: isEditing ? "Your task has been updated successfully" : "Your new task has been created",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Request New Task'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              {!hideAdvisor && (
                <FormField
                  control={form.control}
                  name="advisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advisor</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select advisor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {advisorsList.map((advisor) => (
                            <SelectItem key={advisor} value={advisor}>
                              {advisor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isEditing && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isEditing ? 'Update' : 'Create'} Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
