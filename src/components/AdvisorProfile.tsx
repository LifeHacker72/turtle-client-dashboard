
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type AdvisorData } from './AdvisorCard';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Linkedin, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from '@/hooks/use-mobile';

interface AdvisorProfileProps {
  advisor: AdvisorData;
}

const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ advisor }) => {
  const isActive = advisor.completionPercentage >= 50;
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-scale-in space-y-3 md:space-y-4">
      <DialogHeader className="space-y-3 md:space-y-4">
        <div className="flex items-start space-x-3 md:space-x-4">
          <div className="flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img 
              src={advisor.imageSrc} 
              alt={advisor.name}
              className={`w-full h-full object-cover object-center ${!isActive ? 'grayscale-filter' : ''}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
              }}
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1">
              <DialogTitle className="text-lg md:text-xl font-semibold">{advisor.name}</DialogTitle>
            </div>
            <p className="text-xs md:text-sm text-gray-500">{advisor.title}</p>
            {advisor.linkedinUrl && (
              <a 
                href={advisor.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#0077B5] text-white hover:bg-[#0369a1] transition-colors mt-2"
                aria-label={`${advisor.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-3 w-3 md:h-4 md:w-4" fill="white" />
              </a>
            )}
          </div>
        </div>
      </DialogHeader>
      
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="bg-gray-50 p-2 md:p-3 rounded-md">
            <p className="text-xs md:text-sm text-gray-500">Qualification</p>
            <p className="text-sm md:text-base font-semibold">{advisor.qualification}</p>
          </div>
          <div className="bg-gray-50 p-2 md:p-3 rounded-md">
            <p className="text-xs md:text-sm text-gray-500">Experience</p>
            <p className="text-sm md:text-base font-semibold">{advisor.experience}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-1">
            <span>Data completion</span>
            <span className="font-medium">{advisor.completionPercentage}%</span>
          </div>
          <Progress 
            value={advisor.completionPercentage} 
            className="h-1.5 md:h-2 mb-3 md:mb-4" 
            indicatorClassName={`${isActive ? 'bg-[#2edfbf]' : 'bg-gray-400'}`}
          />
        </div>
        
        <DialogDescription className="text-xs md:text-sm text-gray-700 leading-relaxed">
          {advisor.bio}
        </DialogDescription>
        
        {!isActive && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-2 md:p-3">
            <p className="text-xs md:text-sm text-amber-800">
              Please complete your data inputs to connect with {advisor.name.split(' ')[0]}.
            </p>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          {isActive ? (
            <>
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center text-xs md:text-sm h-8 md:h-9"
                size={isMobile ? "sm" : "default"}
              >
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Schedule Call
              </Button>
              
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center text-xs md:text-sm h-8 md:h-9"
                size={isMobile ? "sm" : "default"}
              >
                <Pencil className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Add Data
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="flex-1 bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all duration-300 cursor-not-allowed flex items-center justify-center text-xs md:text-sm h-8 md:h-9"
                size={isMobile ? "sm" : "default"}
                disabled
              >
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Schedule Call
              </Button>
              
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center text-xs md:text-sm h-8 md:h-9"
                size={isMobile ? "sm" : "default"}
              >
                <Pencil className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Add Data
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfile;
