
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header: React.FC = () => {
  // This would come from your auth context in a real app
  const membershipExpiration = new Date('2024-12-31');
  
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/298bc0f1-29f9-48b1-ad63-ae1d9054c560.png" 
            alt="Turtle Logo" 
            className="h-10"
          />
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-600">
            Membership active until: 
            <span className="ml-1 font-semibold">
              {membershipExpiration.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">Financial Advisory Dashboard</h1>
        <p className="text-gray-500">
          Your personalized 360° financial advisory team, ready to guide you through every aspect of your financial journey.
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2" />
      </div>
    </header>
  );
};

export default Header;
