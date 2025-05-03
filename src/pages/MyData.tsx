
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database } from 'lucide-react';

const MyData: React.FC = () => {
  const dataModules = [
    {
      id: '1',
      title: 'General Profile',
      description: 'Your personal information and contact details',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/my-data/general-profile'
    },
    {
      id: '2',
      title: 'Investments & Financial Planning',
      description: 'Track your investments and financial goals',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/my-data/investments'
    },
    {
      id: '3',
      title: 'Taxation',
      description: 'Tax documents and planning information',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/my-data/taxation'
    },
    {
      id: '4',
      title: 'Insurance',
      description: 'Policies and coverage details',
      color: 'bg-red-50',
      iconColor: 'text-red-600',
      link: '/my-data/insurance'
    },
    {
      id: '5',
      title: 'Estate Planning',
      description: 'Wills, trusts and estate documents',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      link: '/my-data/estate-planning'
    },
    {
      id: '6',
      title: 'Credit Cards',
      description: 'Credit card accounts and management',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      link: '/my-data/credit-cards'
    },
    {
      id: '7',
      title: 'Miscellaneous',
      description: 'Other important financial information',
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      link: '/my-data/miscellaneous'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Data</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dataModules.map((module) => (
          <a 
            href={module.link} 
            key={module.id}
            className="block transition-transform hover:scale-105"
          >
            <Card className={`h-full shadow hover:shadow-md transition-shadow ${module.color} border-0`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${module.color}`}>
                    <Database className={`h-6 w-6 ${module.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyData;
