
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import AdvisorProfile from './AdvisorProfile';

export interface AdvisorData {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualification: string;
  experience: string;
  imageSrc: string;
  completionPercentage: number;
  bio: string;
}

interface AdvisorCardProps {
  advisor: AdvisorData;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = advisor.completionPercentage >= 50;
  
  return (
    <div 
      className="animate-slide-up relative group"
      style={{ animationDelay: `${parseInt(advisor.id) * 100}ms` }}
    >
      <div 
        className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full bg-advisorCard-accent overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-50 transition-opacity duration-300 ${isHovered ? 'opacity-70' : 'opacity-50'}`}
          />
          
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer w-full h-full relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <img 
                  src={advisor.imageSrc} 
                  alt={advisor.name}
                  className={`w-full h-full object-cover object-top transition-all duration-500 ${!isActive ? 'grayscale-filter contrast-125 brightness-90' : ''} ${isHovered ? 'scale-105' : 'scale-100'}`}
                />
                <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <div className="transition-transform duration-300 transform group-hover:translate-y-[-4px]">
                    <h3 className="font-semibold text-lg">{advisor.name}</h3>
                    <p className="text-sm text-white/90">{advisor.title}</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <AdvisorProfile advisor={advisor} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="p-4 bg-white">
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Data completion</span>
                <span className="font-medium">{advisor.completionPercentage}%</span>
              </div>
              <Progress 
                value={advisor.completionPercentage} 
                className="h-2" 
                indicatorClassName={`${isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center gap-2"
                size="sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Call</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Qualification</p>
                <p className="font-semibold">{advisor.qualification}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-semibold">{advisor.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
