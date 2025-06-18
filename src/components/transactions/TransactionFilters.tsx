
import React from 'react';
import { VideoIcon, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTransactions } from '@/contexts/TransactionContext';

interface TransactionFiltersProps {
  onAddTransaction: () => void;
}

const TransactionFilters = ({ onAddTransaction }: TransactionFiltersProps) => {
  const { transactions, filterStatus, setFilterStatus } = useTransactions();

  const forReviewCount = transactions.filter(t => t.status === 'unmatched').length;
  const categorizedCount = transactions.filter(t => t.status === 'matched').length;
  const excludedCount = transactions.filter(t => t.status === 'excluded').length;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Badge 
          variant={filterStatus === 'unmatched' ? 'default' : 'secondary'}
          className={`cursor-pointer ${
            filterStatus === 'unmatched' 
              ? 'bg-gray-700 text-white hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setFilterStatus(filterStatus === 'unmatched' ? 'all' : 'unmatched')}
        >
          For review ({forReviewCount})
        </Badge>
        <Badge 
          variant={filterStatus === 'matched' ? 'default' : 'outline'}
          className={`cursor-pointer ${
            filterStatus === 'matched' 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setFilterStatus(filterStatus === 'matched' ? 'all' : 'matched')}
        >
          Categorized ({categorizedCount})
        </Badge>
        <Badge 
          variant={filterStatus === 'excluded' ? 'default' : 'outline'}
          className={`cursor-pointer ${
            filterStatus === 'excluded' 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setFilterStatus(filterStatus === 'excluded' ? 'all' : 'excluded')}
        >
          Excluded ({excludedCount})
        </Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          onClick={onAddTransaction}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          <VideoIcon className="w-4 h-4 mr-2" />
          Video tutorials
        </Button>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Take a tour
        </Button>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          Go to bank register
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilters;
