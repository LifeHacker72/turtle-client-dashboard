
import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, ListTodo, MessageSquare, FileText, User } from 'lucide-react';
import Header from './Header';
import TurtleHotline from './TurtleHotline';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-2">
              <img 
                src="/lovable-uploads/298bc0f1-29f9-48b1-ad63-ae1d9054c560.png" 
                alt="Turtle Logo" 
                className="h-8 w-auto"
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={window.location.pathname === '/'} tooltip="Dashboard">
                  <a href="/">
                    <Home />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={window.location.pathname === '/pending-items'} tooltip="Pending Items">
                  <a href="/pending-items">
                    <ListTodo />
                    <span>Pending Items</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={window.location.pathname === '/discussion-notes'} tooltip="Discussion Notes">
                  <a href="/discussion-notes">
                    <MessageSquare />
                    <span>Discussion Notes</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={window.location.pathname === '/my-data'} tooltip="My Data">
                  <a href="/my-data">
                    <FileText />
                    <span>My Data</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={window.location.pathname === '/my-membership'} tooltip="My Membership">
                  <a href="/my-membership">
                    <User />
                    <span>My Membership</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col w-full">
          <div className="max-w-full mx-auto px-3 md:px-4 py-4 md:py-8 sm:px-6 lg:px-8 w-full">
            <Header />
            <main className="mt-4">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
      
      <TurtleHotline />
    </SidebarProvider>
  );
};

export default DashboardLayout;
