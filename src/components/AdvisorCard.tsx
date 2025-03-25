
import React, { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Linkedin, Calendar, Pencil, X } from "lucide-react";

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
  isExpanded: boolean;
  onClick: () => void;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor, isExpanded, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();
  const isActive = advisor.completionPercentage >= 50;
  
  // Get formatted date for the profile
  const lastUpdated = new Date();
  const formattedDate = lastUpdated.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Special rendering for Turtle Hotline card
  if (advisor.isTurtleHotline) {
    return (
      <div 
        className={`
          animate-slide-up rounded-lg overflow-hidden shadow-md transition-all duration-300 
          hover:shadow-lg h-full flex flex-col cursor-pointer 
          hover:transform hover:scale-105 hover:shadow-[0_0_15px_#2edfbf] 
          hover:border hover:border-[#2edfbf] bg-advisorCard-background border border-transparent
          ${isExpanded ? 'z-50' : ''}
        `}
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
        
        <div className="p-2 bg-white flex-grow flex flex-col">
          <div className="flex flex-col h-full">
            <div className="mb-1">
              <h3 className="font-semibold text-xs md:text-sm truncate">{advisor.name}</h3>
              <p className="text-xs text-gray-600 truncate">{advisor.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-xs bg-gray-50 rounded-lg p-1.5">
              <div>
                <p className="text-gray-500 text-[10px]">Availability</p>
                <p className="font-medium text-xs">24/7</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px]">Response</p>
                <p className="font-medium text-xs">Immediate</p>
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
      className={`
        animate-slide-up transition-all duration-500 ease-in-out
        ${isExpanded ? 'absolute inset-0 z-50' : 'relative z-10'} 
      `}
      style={{ 
        animationDelay: `${parseInt(advisor.id) * 100}ms`,
      }}
    >
      <div 
        className={`
          rounded-lg overflow-hidden shadow-md transition-all duration-500 
          h-full flex flex-col cursor-pointer
          ${isHovered && !isExpanded ? 'transform scale-105 shadow-[0_0_15px_#2edfbf] border border-[#2edfbf]' : 'bg-advisorCard-background border border-transparent'}
          ${isExpanded ? 'fixed inset-0 md:inset-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-md md:h-auto z-50 bg-white scale-100 shadow-xl' : ''}
        `}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => !isExpanded && setIsHovered(false)}
        onClick={!isExpanded ? onClick : undefined}
      >
        {isExpanded && (
          <div className="absolute top-2 right-2 z-50">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }} 
              className="h-7 w-7 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {!isExpanded ? (
          <>
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
            
            <div className="p-2 bg-white relative flex-grow flex flex-col">
              <div className="flex flex-col h-full">
                <div className="mb-1">
                  <h3 className="font-semibold text-xs md:text-sm truncate">{advisor.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-600 truncate">{advisor.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-1 text-[10px] md:text-xs bg-gray-50 rounded-lg p-1.5">
                  <div>
                    <p className="text-gray-500 text-[8px] md:text-[10px]">Credentials</p>
                    <p className="font-medium">{advisor.qualification}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[8px] md:text-[10px]">Experience</p>
                    <p className="font-medium">{advisor.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-scale-in overflow-auto max-h-[100vh] md:max-h-[80vh] p-4">
            <div className="space-y-3 md:space-y-4">
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
                    <h2 className="text-lg md:text-xl font-semibold">{advisor.name}</h2>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">{advisor.title}</p>
                  {advisor.linkedinUrl && (
                    <a 
                      href={advisor.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#0077B5] text-white hover:bg-[#0369a1] transition-colors mt-2"
                      aria-label={`${advisor.name}'s LinkedIn profile`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-3 w-3 md:h-4 md:w-4" fill="white" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-gray-50 p-2 md:p-3 rounded-md">
                    <p className="text-xs md:text-sm text-gray-500">Credentials</p>
                    <p className="text-sm md:text-base font-semibold">{advisor.qualification}</p>
                  </div>
                  <div className="bg-gray-50 p-2 md:p-3 rounded-md">
                    <p className="text-xs md:text-sm text-gray-500">Experience</p>
                    <p className="text-sm md:text-base font-semibold">{advisor.experience}</p>
                  </div>
                </div>
                
                {/* Data completion section */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-md space-y-2">
                  {!isActive && (
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      Just {Math.ceil((50 - advisor.completionPercentage) / 10)} minutes needed to complete
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
                    <span>Data completion</span>
                    <span className="font-medium">{advisor.completionPercentage}%</span>
                  </div>
                  <Progress 
                    value={advisor.completionPercentage} 
                    className="h-1.5 md:h-2" 
                    indicatorClassName={`${isActive ? 'bg-[#2edfbf]' : 'bg-[#ea384c]'}`}
                  />
                  <p className="text-xs text-gray-500 italic pt-1">Last updated on {formattedDate}</p>
                </div>
                
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {advisor.bio}
                </p>
                
                {!isActive && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-2 md:p-3">
                    <p className="text-xs md:text-sm text-amber-800">
                      {advisor.name} needs more information to be able to advise you.
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
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
                        Input Data
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
                        Input Data
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/70 z-40"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default AdvisorCard;
