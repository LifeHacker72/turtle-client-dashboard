
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AdvisorProfile from './AdvisorProfile';
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
  isTurtleHotline?: boolean;
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
  
  // Special rendering for Turtle Hotline card
  if (advisor.isTurtleHotline) {
    return (
      <div 
        className="animate-slide-up rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col cursor-pointer hover:transform hover:scale-105 hover:shadow-[0_0_20px_#2edfbf] hover:border-2 hover:border-[#2edfbf] bg-advisorCard-background border border-transparent"
        style={{ animationDelay: `${parseInt(advisor.id) * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open('tel:+18001234567', '_blank')}
      >
        <div className="relative bg-gray-100">
          <AspectRatio ratio={1 / 1} className="w-full h-full">
            <img 
              src="/lovable-uploads/92fd3275-10f8-45d0-a84e-3072d46b0893.png" 
              alt="Turtle Hotline"
              className="w-full h-full object-contain p-2"
            />
          </AspectRatio>
        </div>
        
        <div className="p-3 md:p-5 bg-white flex-grow flex flex-col">
          <div className="flex flex-col h-full">
            <div className="mb-2 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg truncate">{advisor.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 truncate">{advisor.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs md:text-sm bg-gray-50 rounded-lg p-2 md:p-3">
              <div>
                <p className="text-gray-500 text-xs">Availability</p>
                <p className="font-medium">24/7</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Response</p>
                <p className="font-medium">Immediate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Regular advisor cards
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
            
            <div className="p-3 md:p-5 bg-white relative flex-grow flex flex-col">
              <div className="flex flex-col h-full">
                <div className="mb-2 md:mb-4">
                  <h3 className="font-semibold text-base md:text-lg truncate">{advisor.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">{advisor.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm bg-gray-50 rounded-lg p-2 md:p-3">
                  <div>
                    <p className="text-gray-500 text-xs">Credentials</p>
                    <p className="font-medium">{advisor.qualification}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Experience</p>
                    <p className="font-medium">{advisor.experience}</p>
                  </div>
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
