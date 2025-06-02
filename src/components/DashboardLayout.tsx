
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, User, FileText, MessageSquare, LogOut } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: FileText },
    { path: '/pending-items', label: 'Pending Tasks', icon: Clock },
    { path: '/my-data', label: 'My Data', icon: User },
    { path: '/discussion-notes', label: 'Discussion Notes', icon: MessageSquare },
    { path: '/my-membership', label: 'My Membership', icon: User },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <img 
            src="/lovable-uploads/a7a21041-659c-469e-a613-92e6fd6b6e7b.png" 
            alt="Turtle Logo" 
            className="w-full h-auto"
          />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 text-base font-medium",
                  isActive && "bg-[#2edebe] hover:bg-[#2edebe]/90 text-white"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
        
        {/* Bottom Section */}
        <div className="p-4 border-t space-y-3">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Membership active until:</p>
            <p>Dec 31, 2025</p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start h-12 text-base"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
