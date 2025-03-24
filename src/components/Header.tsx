
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const Header: React.FC = () => {
  // This would come from your auth context in a real app
  const membershipExpiration = new Date('2024-12-31');
  
  return (
    <header>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/298bc0f1-29f9-48b1-ad63-ae1d9054c560.png" 
            alt="Turtle Logo" 
            className="h-12 md:h-14 hover:scale-105 transition-transform duration-300"
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
      
      <Separator className="my-4" />
    </header>
  );
};

export default Header;
