
import React from 'react';
import AdvisorCard from './AdvisorCard';
import Header from './Header';
import { type AdvisorData } from './AdvisorCard';

const advisors: AdvisorData[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Financial Planner",
    specialty: "Financial Planning",
    qualification: "CFP®",
    experience: "12 Years",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    completionPercentage: 75,
    bio: "Sarah is a Certified Financial Planner with over 12 years of experience in comprehensive financial planning. She specializes in retirement planning, investment strategies, and helping clients achieve long-term financial goals."
  },
  {
    id: "2",
    name: "Michael Chang",
    title: "Tax Specialist",
    specialty: "Tax",
    qualification: "CPA",
    experience: "15 Years",
    imageSrc: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    completionPercentage: 30,
    bio: "Michael is a Certified Public Accountant with expertise in tax planning, compliance, and optimization strategies. He helps clients navigate complex tax regulations and maximize their tax efficiency."
  },
  {
    id: "3",
    name: "Emily Richards",
    title: "Insurance Consultant",
    specialty: "Insurance",
    qualification: "CLU®",
    experience: "8 Years",
    imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    completionPercentage: 15,
    bio: "Emily is a Chartered Life Underwriter specializing in insurance planning, risk management, and protection strategies. She helps clients identify and address potential financial risks through appropriate insurance solutions."
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Estate Planner",
    specialty: "Estate Planning",
    qualification: "JD, LL.M",
    experience: "20 Years",
    imageSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    completionPercentage: 55,
    bio: "James is an experienced attorney specializing in estate planning, wills, trusts, and legacy planning. He helps clients protect their assets and ensure their wishes are carried out effectively."
  },
  {
    id: "5",
    name: "Olivia Martinez",
    title: "Credit Advisor",
    specialty: "Credit Card",
    qualification: "FICO Pro",
    experience: "10 Years",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    completionPercentage: 40,
    bio: "Olivia specializes in credit optimization, debt management, and credit card strategies. She helps clients improve their credit profiles and make strategic decisions about credit products."
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
        
        <section className="mt-12">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Financial Journey</h2>
            <p className="text-gray-600">
              Our team of experts is ready to guide you through every step of your financial journey. To get the most out of your advisory experience:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-advisorCard-neonGreen/20 flex items-center justify-center text-advisorCard-neonGreen mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700">Complete your profile data for each advisory area</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-advisorCard-neonGreen/20 flex items-center justify-center text-advisorCard-neonGreen mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700">Schedule calls with your dedicated advisors</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-advisorCard-neonGreen/20 flex items-center justify-center text-advisorCard-neonGreen mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700">Unlock personalized advice by completing at least 50% of your data</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
