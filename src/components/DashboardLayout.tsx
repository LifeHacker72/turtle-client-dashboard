
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, ListTodo, MessageSquare, FileText, User, LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // This would come from your auth context in a real app
  const membershipExpiration = new Date('2024-12-31');
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-center p-4">
              <img 
                src="/lovable-uploads/298bc0f1-29f9-48b1-ad63-ae1d9054c560.png" 
                alt="Turtle Logo" 
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/'} tooltip="Dashboard">
                  <Link to="/" className="h-12 text-base">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/pending-items'} tooltip="Pending Items">
                  <Link to="/pending-items" className="h-12 text-base">
                    <ListTodo className="h-5 w-5" />
                    <span>Pending Items</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/discussion-notes'} tooltip="Discussion Notes">
                  <Link to="/discussion-notes" className="h-12 text-base">
                    <MessageSquare className="h-5 w-5" />
                    <span>Discussion Notes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/my-data'} tooltip="My Data">
                  <Link to="/my-data" className="h-12 text-base">
                    <FileText className="h-5 w-5" />
                    <span>My Data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/my-membership'} tooltip="My Membership">
                  <Link to="/my-membership" className="h-12 text-base">
                    <User className="h-5 w-5" />
                    <span>My Membership</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 flex flex-col gap-4">
              <div className="text-xs text-gray-600">
                Membership active until: 
                <span className="ml-1 font-semibold block mt-1">
                  {membershipExpiration.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <Separator />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2 hover:text-primary">
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Log out</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <div className="max-w-full mx-auto px-3 md:px-6 py-4 md:py-8 lg:px-8 w-full">
            <main>
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
