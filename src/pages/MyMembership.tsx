
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CreditCard, FileCheck } from 'lucide-react';

const MyMembership: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Membership</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Agreements Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My Agreements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="font-medium">Financial Advisory Agreement</div>
                <div className="text-sm text-gray-500">Signed: April 10, 2025</div>
                <a href="#" className="text-sm text-blue-600 hover:underline">View Document</a>
              </li>
              <li>
                <div className="font-medium">Data Privacy Consent</div>
                <div className="text-sm text-gray-500">Signed: April 10, 2025</div>
                <a href="#" className="text-sm text-blue-600 hover:underline">View Document</a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* KYC Details Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              KYC Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="font-medium">Identity Verification</div>
                <div className="text-sm text-gray-500">Verified: April 12, 2025</div>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </div>
              </li>
              <li>
                <div className="font-medium">Address Verification</div>
                <div className="text-sm text-gray-500">Verified: April 12, 2025</div>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Invoices Section */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="font-medium">Invoice #INV-2025-001</div>
                <div className="text-sm text-gray-500">April 2025 Membership</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-medium">$99.00</span>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Paid
                  </span>
                </div>
              </li>
              <li>
                <div className="font-medium">Invoice #INV-2025-002</div>
                <div className="text-sm text-gray-500">May 2025 Membership</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-medium">$99.00</span>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    Upcoming
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyMembership;
