
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type AdvisorData } from './AdvisorCard';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Linkedin, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AdvisorProfileProps {
  advisor: AdvisorData;
}

const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ advisor }) => {
  const isActive = advisor.completionPercentage >= 50;
  
  return (
    <div className="animate-scale-in space-y-4">
      <DialogHeader className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
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
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">{advisor.name}</DialogTitle>
              {advisor.linkedinUrl && (
                <a 
                  href={advisor.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0077B5] text-white hover:bg-[#0369a1] transition-colors"
                  aria-label={`${advisor.name}'s LinkedIn profile`}
                >
                  <Linkedin className="h-4 w-4" fill="white" />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-500">{advisor.title}</p>
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                {advisor.specialty} Advisor
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Qualification</p>
            <p className="font-semibold">{advisor.qualification}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-semibold">{advisor.experience}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
            <span>Data completion</span>
            <span className="font-medium">{advisor.completionPercentage}%</span>
          </div>
          <Progress 
            value={advisor.completionPercentage} 
            className="h-2 mb-4" 
            indicatorClassName={`${isActive ? 'bg-[#2edfbf]' : 'bg-gray-400'}`}
          />
        </div>
        
        <DialogDescription className="text-gray-700 leading-relaxed">
          {advisor.bio}
        </DialogDescription>
        
        {!isActive && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
            <p className="text-sm text-amber-800">
              Please complete your data inputs to connect with {advisor.name.split(' ')[0]}.
            </p>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          {isActive ? (
            <>
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center"
                size="sm"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center"
                size="sm"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Add Data
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="flex-1 bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all duration-300 cursor-not-allowed flex items-center justify-center"
                size="sm"
                disabled
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              
              <Button 
                className="flex-1 bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center"
                size="sm"
              >
                <Pencil className="h-4 w-4 mr-2" />
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
