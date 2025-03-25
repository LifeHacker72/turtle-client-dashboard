
import React, { useEffect, useState } from 'react';
import AdvisorCard from './AdvisorCard';
import Header from './Header';
import { type AdvisorData } from './AdvisorCard';

const advisors: AdvisorData[] = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Financial Planner",
    specialty: "Financial Planning",
    qualification: "RIA",
    experience: "12 Years",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    completionPercentage: 75,
    bio: "Priya is a Registered Investment Advisor with over 12 years of experience in comprehensive financial planning. She specializes in retirement planning, investment strategies, and helping clients achieve long-term financial goals.",
    linkedinUrl: "https://linkedin.com/in/priyasharma"
  },
  {
    id: "2",
    name: "Rajesh Patel",
    title: "Tax Specialist",
    specialty: "Tax",
    qualification: "CA",
    experience: "15 Years",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    completionPercentage: 30,
    bio: "Rajesh is a Chartered Accountant with expertise in tax planning, compliance, and optimization strategies. He helps clients navigate complex tax regulations and maximize their tax efficiency.",
    linkedinUrl: "https://linkedin.com/in/rajeshpatel"
  },
  {
    id: "3",
    name: "Anjali Desai",
    title: "Insurance Consultant",
    specialty: "Insurance",
    qualification: "CLU®",
    experience: "8 Years",
    imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    completionPercentage: 15,
    bio: "Anjali is a Chartered Life Underwriter specializing in insurance planning, risk management, and protection strategies. She helps clients identify and address potential financial risks through appropriate insurance solutions.",
    linkedinUrl: "https://linkedin.com/in/anjalidesai"
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "Estate Planner",
    specialty: "Estate Planning",
    qualification: "Advocate",
    experience: "20 Years",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    completionPercentage: 55,
    bio: "Vikram is an experienced advocate specializing in estate planning, wills, trusts, and legacy planning. He helps clients protect their assets and ensure their wishes are carried out effectively.",
    linkedinUrl: "https://linkedin.com/in/vikramsingh"
  },
  {
    id: "5",
    name: "Meera Kapoor",
    title: "Credit Card Advisor",
    specialty: "Credit Card",
    qualification: "FICO Pro",
    experience: "10 Years",
    imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    completionPercentage: 40,
    bio: "Meera specializes in credit card optimization, debt management, and credit card strategies. She helps clients improve their credit profiles and make strategic decisions about credit products.",
    linkedinUrl: "https://linkedin.com/in/meerakapoor"
  },
  {
    id: "6",
    name: "Turtle Hotline",
    title: "24/7 Support",
    specialty: "Customer Support",
    qualification: "24/7",
    experience: "Immediate",
    imageSrc: "/lovable-uploads/92fd3275-10f8-45d0-a84e-3072d46b0893.png",
    completionPercentage: 100,
    bio: "Need immediate assistance? Our Turtle Hotline is available 24/7 to help with any questions or concerns you may have about your financial journey.",
    isTurtleHotline: true
  },
];

const Dashboard: React.FC = () => {
  const [containerStyle, setContainerStyle] = useState({});
  
  // Function to adjust container size based on viewport
  useEffect(() => {
    const adjustSize = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 64; // Estimated header height
      const availableHeight = viewportHeight - headerHeight - 40; // Subtract padding/margins
      const cardHeight = Math.floor(availableHeight / 2); // Divide by 2 rows
      
      setContainerStyle({
        maxHeight: `${availableHeight}px`,
        gridTemplateRows: `repeat(2, minmax(0, ${cardHeight}px))`,
      });
    };
    
    // Adjust on mount and window resize
    adjustSize();
    window.addEventListener('resize', adjustSize);
    return () => window.removeEventListener('resize', adjustSize);
  }, []);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gray-50 flex flex-col">
      <div className="w-full h-full mx-auto px-2 md:px-4 py-2 flex flex-col">
        <Header />
        
        <section className="flex-grow flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Your Advisory Team</h2>
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 mx-auto w-full max-w-5xl" 
            style={containerStyle}
          >
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
