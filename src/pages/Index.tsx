
import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AccountCard from '../components/dashboard/AccountCard';
import TransactionTabs from '../components/transactions/TransactionTabs';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionDialog from '../components/transactions/TransactionDialog';
import { TransactionProvider } from '../contexts/TransactionContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <TransactionProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1">
          <Header />
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Transactions
              </h1>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-300"
                >
                  Link account
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-600"
                >
                  <span className="mr-2">🔄</span>
                  Update
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-300"
                >
                  <span className="mr-2">🔍</span>
                  Explore
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <AccountCard
                title="Checking"
                bankBalance="$3,621.93"
                quickbooksBalance="$1,201.00"
                transactions={25}
                type="checking"
                updatedTime="Updated moments ago"
              />
              <AccountCard
                title="Savings"
                bankBalance="$200.00"
                quickbooksBalance="$800.00"
                transactions={1}
                type="savings"
                updatedTime="Updated moments ago"
              />
              <AccountCard
                title="Mastercard"
                bankBalance="$304.96"
                quickbooksBalance="$157.72"
                transactions={7}
                type="credit"
                updatedTime="Updated moments ago"
              />
            </div>

            <TransactionTabs />
            <TransactionFilters onAddTransaction={() => setAddDialogOpen(true)} />
            <TransactionTable />
            
            <TransactionDialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
              transaction={null}
            />
          </div>
        </div>
      </div>
    </TransactionProvider>
  );
};

export default Index;
