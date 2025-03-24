
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import AdvisorProfile from './AdvisorProfile';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const initials = advisor.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div 
      className="animate-slide-up"
      style={{ animationDelay: `${parseInt(advisor.id) * 100}ms` }}
    >
      <div 
        className="rounded-xl overflow-hidden bg-advisorCard-background shadow-md transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] bg-advisorCard-accent">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-advisorCard-accent/60"></div>
                <img 
                  src={advisor.imageSrc} 
                  alt={advisor.name}
                  className={`w-full h-full object-cover object-top transition-all duration-500 ${!isActive ? 'silhouette-effect' : ''}`}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <AdvisorProfile advisor={advisor} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="p-5 bg-white relative">
          <div className="absolute right-4 top-4">
            <Avatar className="h-8 w-8 bg-advisorCard-neonGreen text-white">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="text-xs font-medium">➚</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{advisor.name}</h3>
              <p className="text-sm text-gray-600">{advisor.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 rounded-lg p-3">
              <div>
                <p className="text-gray-500 text-xs">Qualification</p>
                <p className="font-medium">{advisor.qualification}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Experience</p>
                <p className="font-medium">{advisor.experience}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Data completion</span>
                <span className="font-medium">{advisor.completionPercentage}%</span>
              </div>
              <Progress 
                value={advisor.completionPercentage} 
                className="h-2" 
                indicatorClassName={`${isActive ? 'bg-advisorCard-neonGreen' : 'bg-gray-400'}`}
              />
            </div>
            
            {isActive ? (
              <div className="flex justify-center">
                <Button 
                  className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300 flex items-center justify-center gap-2"
                  size="sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Call</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all duration-300 cursor-not-allowed"
                  size="sm"
                  disabled
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <p className="text-xs text-amber-600 text-center">
                  {advisor.name.split(' ')[0]} needs more information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
