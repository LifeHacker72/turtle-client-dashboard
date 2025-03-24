
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Pencil, User, Linkedin } from "lucide-react";
import AdvisorProfile from './AdvisorProfile';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '@/hooks/use-mobile';

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
  linkedinUrl?: string;
}

interface AdvisorCardProps {
  advisor: AdvisorData;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();
  const isActive = advisor.completionPercentage >= 50;
  const initials = advisor.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div 
      className="animate-slide-up"
      style={{ animationDelay: `${parseInt(advisor.id) * 100}ms` }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col cursor-pointer ${
              isHovered 
                ? 'transform scale-105 shadow-[0_0_20px_#2edfbf] border-2 border-[#2edfbf]' 
                : 'bg-advisorCard-background border border-transparent'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative bg-gray-100">
              <div className="w-full flex items-center justify-center relative">
                <AspectRatio ratio={1 / 1} className="w-full h-full">
                  {!imageLoaded && !imageError && (
                    <Skeleton className="absolute inset-0 z-0 bg-gray-200" />
                  )}
                  
                  <img 
                    src={advisor.imageSrc} 
                    alt={advisor.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
                      setImageError(false);
                    }}
                    className={`w-full h-full object-cover object-center transition-all duration-500 z-5 ${!isActive ? 'silhouette-effect' : ''}`}
                  />
                </AspectRatio>
              </div>
            </div>
            
            <div className="p-3 md:p-5 bg-white relative flex-grow flex flex-col">
              <div className="absolute right-2 md:right-4 top-2 md:top-4">
                {advisor.linkedinUrl ? (
                  <a 
                    href={advisor.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-6 w-6 md:h-8 md:w-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:bg-[#0369a1] transition-colors"
                    aria-label={`${advisor.name}'s LinkedIn profile`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="h-3 w-3 md:h-4 md:w-4" fill="white" />
                  </a>
                ) : (
                  <Avatar className="h-6 w-6 md:h-8 md:w-8 bg-advisorCard-neonGreen text-white">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="text-xs font-medium">➚</AvatarFallback>
                  </Avatar>
                )}
              </div>
              
              <div className="flex flex-col h-full">
                <div className="mb-2 md:mb-4">
                  <h3 className="font-semibold text-base md:text-lg truncate">{advisor.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">{advisor.title}</p>
                </div>
                
                {/* Only show qualification info on non-mobile screens or if the card is active */}
                {(!isMobile || isActive) && (
                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm bg-gray-50 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Qualification</p>
                      <p className="font-medium">{advisor.qualification}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Experience</p>
                      <p className="font-medium">{advisor.experience}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-1 mb-auto">
                  <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
                    <span>Data completion</span>
                    <span className="font-medium">{advisor.completionPercentage}%</span>
                  </div>
                  <Progress 
                    value={advisor.completionPercentage} 
                    className="h-1.5 md:h-2" 
                    indicatorClassName={`${isActive ? 'bg-[#2edfbf]' : 'bg-gray-400'}`}
                  />
                </div>
                
                <div className="mt-3 md:mt-4">
                  {isActive ? (
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm h-8 md:h-9"
                        size={isMobile ? "sm" : "default"}
                      >
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Schedule Call</span>
                      </Button>
                      
                      <Button 
                        className="w-full bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 text-xs md:text-sm h-8 md:h-9"
                        size={isMobile ? "sm" : "default"}
                      >
                        <Pencil className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Add Data
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-amber-600 text-center">
                        {advisor.name.split(' ')[0]} needs more information
                      </p>
                      <Button 
                        className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all duration-300 cursor-not-allowed text-xs md:text-sm h-8 md:h-9"
                        size={isMobile ? "sm" : "default"}
                        disabled
                      >
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Schedule Call
                      </Button>
                      
                      <Button 
                        className="w-full bg-black hover:bg-black/90 hover:border-[#2edfbf] hover:border-2 text-white transition-all duration-300 text-xs md:text-sm h-8 md:h-9"
                        size={isMobile ? "sm" : "default"}
                      >
                        <Pencil className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Add Data
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <AdvisorProfile advisor={advisor} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvisorCard;
