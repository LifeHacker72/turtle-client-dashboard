
import React from 'react';
import { type AdvisorData } from './AdvisorCard';
import TurtleHotlineProfile from './profile/TurtleHotlineProfile';
import RegularAdvisorProfile from './profile/RegularAdvisorProfile';

interface AdvisorProfileProps {
  advisor: AdvisorData;
}

const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ advisor }) => {
  // Special case for Turtle Hotline
  if (advisor.isTurtleHotline) {
    return <TurtleHotlineProfile advisor={advisor} />;
  }
  
  // Regular advisor profile
  return <RegularAdvisorProfile advisor={advisor} />;
};

export default AdvisorProfile;
