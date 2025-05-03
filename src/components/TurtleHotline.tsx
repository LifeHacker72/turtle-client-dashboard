
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TurtleHotline: React.FC = () => {
  const handleClick = () => {
    window.open('https://wa.me/+123456789', '_blank');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={handleClick}
            className="fixed bottom-6 right-6 bg-black text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
            aria-label="Turtle Hotline"
          >
            <div className="flex items-center gap-2 px-3 py-1">
              <img 
                src="/lovable-uploads/92fd3275-10f8-45d0-a84e-3072d46b0893.png" 
                alt="Turtle Hotline" 
                className="h-8 w-8 object-cover rounded-full"
              />
              <span className="font-medium text-sm">Turtle Hotline</span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Need help? Click to chat with us!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TurtleHotline;
