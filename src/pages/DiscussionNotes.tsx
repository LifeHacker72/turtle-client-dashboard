
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DiscussionNotes: React.FC = () => {
  // Placeholder data for meetings
  const meetings = [
    { 
      id: '1', 
      title: 'Financial Planning Review', 
      date: '2025-05-02',
      advisor: 'Priya Sharma',
      summary: 'Discussed retirement goals and investment strategy. Recommended portfolio adjustments.',
      notes: [
        'Review 401(k) allocation',
        'Research tax-advantaged investment options',
        'Schedule follow-up in 3 months'
      ]
    },
    { 
      id: '2', 
      title: 'Tax Strategy Session', 
      date: '2025-04-15',
      advisor: 'Rajesh Patel',
      summary: 'Reviewed current tax situation and identified potential deductions.',
      notes: [
        'Gather documentation for home office deduction',
        'Consider tax-loss harvesting before year end',
        'Review charitable contribution strategy'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Discussion Notes</h1>
      
      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <CardTitle className="text-xl">{meeting.title}</CardTitle>
                <div className="text-sm text-gray-500">
                  {new Date(meeting.date).toLocaleDateString()} with {meeting.advisor}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Summary</h3>
                  <p className="text-sm">{meeting.summary}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Action Items</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {meeting.notes.map((note, index) => (
                      <li key={index} className="text-sm">{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionNotes;
