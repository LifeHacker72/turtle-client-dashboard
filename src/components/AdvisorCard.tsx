
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Share2, User, Linkedin } from "lucide-react";
import AdvisorProfile from './AdvisorProfile';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

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
  const isActive = advisor.completionPercentage >= 50;
  const initials = advisor.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div 
      className="animate-slide-up"
      style={{ animationDelay: `${parseInt(advisor.id) * 100}ms` }}
    >
      <div 
        className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col ${
          isHovered 
            ? 'transform scale-105 shadow-[0_0_20px_#2edfbf] border-2 border-[#2edfbf]' 
            : 'bg-advisorCard-background border border-transparent'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-gray-100">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer w-full flex items-center justify-center relative">
                <AspectRatio ratio={1 / 1} className="w-full h-full">
                  {!imageLoaded && !imageError && (
                    <Skeleton className="absolute inset-0 z-0 bg-gray-200" />
                  )}
                  
                  <img 
                    src={advisor.imageSrc} 
                    alt={advisor.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      // If image fails to load, use a fallback from Unsplash
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
                      setImageError(false);
                    }}
                    className={`w-full h-full object-cover object-center transition-all duration-500 z-5 ${!isActive ? 'silhouette-effect' : ''}`}
                  />
                </AspectRatio>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <AdvisorProfile advisor={advisor} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="p-5 bg-white relative flex-grow flex flex-col">
          <div className="absolute right-4 top-4">
            {advisor.linkedinUrl ? (
              <a 
                href={advisor.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block h-8 w-8 rounded-full bg-advisorCard-neonGreen text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label={`${advisor.name}'s LinkedIn profile`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : (
              <Avatar className="h-8 w-8 bg-advisorCard-neonGreen text-white">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="text-xs font-medium">➚</AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{advisor.name}</h3>
              <p className="text-sm text-gray-600">{advisor.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 rounded-lg p-3 mb-4">
              <div>
                <p className="text-gray-500 text-xs">Qualification</p>
                <p className="font-medium">{advisor.qualification}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Experience</p>
                <p className="font-medium">{advisor.experience}</p>
              </div>
            </div>

            <div className="space-y-1 mb-auto">
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
            
            <div className="mt-4">
              {isActive ? (
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300 flex items-center justify-center gap-2"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Call</span>
                  </Button>
                  
                  <Button 
                    className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Data
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
                  
                  <Button 
                    className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Data
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorCard;
