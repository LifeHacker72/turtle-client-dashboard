
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type AdvisorData } from '../AdvisorCard';
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface TurtleHotlineProfileProps {
  advisor: AdvisorData;
}

const TurtleHotlineProfile: React.FC<TurtleHotlineProfileProps> = ({ advisor }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-scale-in space-y-3 md:space-y-4">
      <DialogHeader className="space-y-3 md:space-y-4">
        <div className="flex items-start space-x-3 md:space-x-4">
          <div className="flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-white shadow-md flex items-center justify-center bg-white">
            <img 
              src="/lovable-uploads/92fd3275-10f8-45d0-a84e-3072d46b0893.png" 
              alt={advisor.name}
              className="w-full h-full object-contain p-1"
            />
          </div>
          
          <div className="flex-grow">
            <DialogTitle className="text-lg md:text-xl font-semibold">{advisor.name}</DialogTitle>
            <p className="text-xs md:text-sm text-gray-500">{advisor.title}</p>
          </div>
        </div>
      </DialogHeader>
      
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-md">
            <p className="text-xs md:text-sm text-gray-500">Availability</p>
            <p className="text-sm md:text-base font-semibold">24/7</p>
          </div>
          <div className="bg-gray-50 p-2 md:p-3 rounded-md">
            <p className="text-xs md:text-sm text-gray-500">Response Time</p>
            <p className="text-sm md:text-base font-semibold">Immediate</p>
          </div>
        </div>
        
        <DialogDescription className="text-xs md:text-sm text-gray-700 leading-relaxed">
          {advisor.bio}
        </DialogDescription>
        
        <Button 
          className="w-full bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm h-8 md:h-9"
          size={isMobile ? "sm" : "default"}
          onClick={() => window.open('tel:+18001234567', '_blank')}
        >
          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
          <span>Call Now</span>
        </Button>
      </div>
    </div>
  );
};

export default TurtleHotlineProfile;
