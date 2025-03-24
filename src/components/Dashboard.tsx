
import React from 'react';
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
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Advisory Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
