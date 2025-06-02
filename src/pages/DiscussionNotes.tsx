
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Meeting {
  id: string;
  advisor: string;
  date: string;
  meetingNumber: string;
  actionItems: string[];
  discussionSummary: string;
}

const DiscussionNotes: React.FC = () => {
  const [selectedActionItems, setSelectedActionItems] = useState<string[] | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [isActionItemsOpen, setIsActionItemsOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Sample data for meetings from AI-based note takers
  const meetings: Meeting[] = [
    {
      id: '1',
      advisor: 'Priya Sharma',
      date: '2025-05-02',
      meetingNumber: 'MTG-001',
      actionItems: [
        'Review 401(k) allocation by next week',
        'Research tax-advantaged investment options',
        'Schedule follow-up meeting in 3 months',
        'Gather Q1 financial statements'
      ],
      discussionSummary: 'Comprehensive financial planning review focusing on retirement goals and investment strategy. Discussed current portfolio performance, risk tolerance, and long-term financial objectives. Advisor recommended portfolio rebalancing and suggested exploring additional tax-advantaged accounts. Client expressed interest in sustainable investing options and requested research on ESG funds.'
    },
    {
      id: '2',
      advisor: 'Rajesh Patel',
      date: '2025-04-15',
      meetingNumber: 'MTG-002',
      actionItems: [
        'Gather documentation for home office deduction',
        'Consider tax-loss harvesting before year end',
        'Review charitable contribution strategy',
        'Update estimated quarterly tax payments'
      ],
      discussionSummary: 'Tax strategy session covering current tax situation and optimization opportunities. Reviewed deductions, credits, and tax-efficient investment strategies. Discussed potential changes in tax legislation and their impact on current strategy. Advisor provided recommendations for maximizing deductions and minimizing tax liability.'
    },
    {
      id: '3',
      advisor: 'Aisha Khan',
      date: '2025-04-05',
      meetingNumber: 'MTG-003',
      actionItems: [
        'Update beneficiary designations on all accounts',
        'Contact attorney for trust amendment',
        'Research estate tax implications of recent legislation',
        'Review life insurance coverage adequacy'
      ],
      discussionSummary: 'Estate planning discussion covering will and trust documents review. Examined succession planning for business assets and family wealth transfer strategies. Discussed recent changes in estate tax laws and their implications. Advisor recommended updates to existing documents and suggested additional protective measures for asset preservation.'
    }
  ];

  const columns = [
    {
      header: 'Advisor',
      accessor: 'advisor' as keyof Meeting,
      width: 'w-[150px]'
    },
    {
      header: 'Date',
      accessor: 'date' as keyof Meeting,
      width: 'w-[100px]',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      header: 'Meeting Number',
      accessor: 'meetingNumber' as keyof Meeting,
      width: 'w-[120px]'
    },
    {
      header: 'Action Items',
      accessor: ((meeting: Meeting) => (
        <Button
          variant="link"
          className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
          onClick={() => handleActionItemsClick(meeting.actionItems)}
        >
          View Action Items ({meeting.actionItems.length})
        </Button>
      )) as any,
      width: 'w-[140px]'
    },
    {
      header: 'Discussion Summary',
      accessor: ((meeting: Meeting) => (
        <Button
          variant="link"
          className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
          onClick={() => handleSummaryClick(meeting.discussionSummary)}
        >
          View Summary
        </Button>
      )) as any,
      width: 'w-[140px]'
    }
  ];

  const handleActionItemsClick = (actionItems: string[]) => {
    setSelectedActionItems(actionItems);
    setIsActionItemsOpen(true);
  };

  const handleSummaryClick = (summary: string) => {
    setSelectedSummary(summary);
    setIsSummaryOpen(true);
  };

  const handleEdit = (meeting: Meeting) => {
    console.log('Edit meeting:', meeting.id);
  };

  const handleView = (meeting: Meeting) => {
    console.log('View meeting:', meeting.id);
  };

  const handleDelete = (meeting: Meeting) => {
    console.log('Delete meeting:', meeting.id);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Discussion Notes</h1>
        <Button variant="outline">Schedule Meeting</Button>
      </div>
      
      <DataTable
        data={meetings}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onStatusChange={() => {}} // Not applicable for this table
      />

      {/* Action Items Dialog */}
      <Dialog open={isActionItemsOpen} onOpenChange={setIsActionItemsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Action Items</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {selectedActionItems?.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Discussion Summary Dialog */}
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Discussion Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{selectedSummary}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscussionNotes;
