
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TransactionTabs = () => {
  const [value, setValue] = useState('bank');

  return (
    <div className="border-b border-gray-200 mb-6">
      <Tabs value={value} onValueChange={setValue} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-transparent h-auto p-0">
          <TabsTrigger 
            value="bank"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Bank transactions
          </TabsTrigger>
          <TabsTrigger 
            value="app"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            App transactions
          </TabsTrigger>
          <TabsTrigger 
            value="receipts"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Receipts
          </TabsTrigger>
          <TabsTrigger 
            value="reconcile"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Reconcile
          </TabsTrigger>
          <TabsTrigger 
            value="rules"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Rules
          </TabsTrigger>
          <TabsTrigger 
            value="accounts"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Chart of accounts
          </TabsTrigger>
          <TabsTrigger 
            value="recurring"
            className="text-sm normal-case data-[state=active]:text-green-600 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:bg-transparent rounded-none"
          >
            Recurring transactions
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
