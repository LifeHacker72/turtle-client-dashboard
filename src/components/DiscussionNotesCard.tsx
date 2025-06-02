
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, FileText } from 'lucide-react';

interface Meeting {
  id: string;
  advisor: string;
  date: string;
  meetingNumber: number;
  actionItems: string[];
  discussionSummary: string;
}

interface DiscussionNotesCardProps {
  meetings: Meeting[];
  onActionItemsClick: (actionItems: string[]) => void;
  onSummaryClick: (summary: string) => void;
}

const DiscussionNotesCard: React.FC<DiscussionNotesCardProps> = ({
  meetings,
  onActionItemsClick,
  onSummaryClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              {meeting.advisor}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {new Date(meeting.date).toLocaleDateString()}
            </div>
            <div className="text-sm">
              <span className="font-medium">Meeting #</span>{meeting.meetingNumber}
            </div>
            <div className="space-y-2">
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => onActionItemsClick(meeting.actionItems)}
              >
                <FileText className="h-4 w-4 mr-1" />
                View Action Items ({meeting.actionItems.length})
              </Button>
              <br />
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => onSummaryClick(meeting.discussionSummary)}
              >
                <FileText className="h-4 w-4 mr-1" />
                View Discussion Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DiscussionNotesCard;
