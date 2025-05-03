
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Calendar, Clock } from 'lucide-react';

const DiscussionNotes: React.FC = () => {
  // Placeholder data for meetings - similar to advisory-dashboard-nexus format
  const meetings = [
    { 
      id: '1', 
      title: 'Financial Planning Review', 
      date: '2025-05-02',
      time: '10:00 AM',
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
      time: '2:30 PM',
      advisor: 'Rajesh Patel',
      summary: 'Reviewed current tax situation and identified potential deductions.',
      notes: [
        'Gather documentation for home office deduction',
        'Consider tax-loss harvesting before year end',
        'Review charitable contribution strategy'
      ]
    },
    { 
      id: '3', 
      title: 'Estate Planning Discussion', 
      date: '2025-04-05',
      time: '11:15 AM',
      advisor: 'Aisha Khan',
      summary: 'Reviewed will and trust documents. Discussed succession planning for business assets.',
      notes: [
        'Update beneficiary designations',
        'Contact attorney for trust amendment',
        'Research estate tax implications of recent legislation'
      ]
    }
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Discussion Notes</h1>
        <Button variant="outline">Schedule Meeting</Button>
      </div>
      
      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b pb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{meeting.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span>with {meeting.advisor}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(meeting.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {meeting.time}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
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
                
                <div className="pt-2 flex justify-end">
                  <Button variant="outline" size="sm">View Full Notes</Button>
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
