
import React, { useState } from 'react';
import { FilterIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Transaction {
  id: string;
  date: string;
  description: string;
  payee: string;
  category: string;
  spent: number | null;
  received: number | null;
  status: 'matched' | 'unmatched' | 'excluded';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '07/15/2025',
    description: 'Books By Bessie',
    payee: 'Books by Bessie',
    category: 'Uncategorized Income',
    spent: null,
    received: 55.00,
    status: 'unmatched'
  },
  {
    id: '2',
    date: '06/15/2025',
    description: 'A Rental',
    payee: '',
    category: 'Uncategorized Income',
    spent: null,
    received: 200.00,
    status: 'unmatched'
  },
  {
    id: '3',
    date: '06/15/2025',
    description: 'A Rental',
    payee: '',
    category: 'Uncategorized Expense',
    spent: 1200.00,
    received: null,
    status: 'unmatched'
  },
  {
    id: '4',
    date: '05/23/2025',
    description: 'A Rental',
    payee: '',
    category: 'Uncategorized Expense',
    spent: 800.00,
    received: null,
    status: 'unmatched'
  },
  {
    id: '5',
    date: '05/20/2025',
    description: 'Pam Seitz',
    payee: 'Pam Seitz',
    category: '2 matches found',
    spent: null,
    received: 75.00,
    status: 'matched'
  },
  {
    id: '6',
    date: '05/20/2025',
    description: 'Deposit',
    payee: '',
    category: '1 match found',
    spent: null,
    received: 868.15,
    status: 'matched'
  }
];

const TransactionTable = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(mockTransactions.map(t => t.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    setSelected(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(item => item !== id)
    );
  };

  const getCategoryChip = (category: string, status: string) => {
    if (status === 'matched') {
      return (
        <Badge 
          variant="secondary"
          className="bg-green-100 text-green-800"
        >
          {category}
        </Badge>
      );
    }
    return (
      <span className="text-sm text-gray-600">
        {category}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300"
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            All dates
          </Button>
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300"
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            All transactions (25)
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            1-25 of 25
          </span>
          <Button size="sm" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selected.length === mockTransactions.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">DATE</TableHead>
              <TableHead className="font-semibold">DESCRIPTION</TableHead>
              <TableHead className="font-semibold">PAYEE</TableHead>
              <TableHead className="font-semibold">CATEGORIZE OR MATCH</TableHead>
              <TableHead className="font-semibold text-right">SPENT</TableHead>
              <TableHead className="font-semibold text-right">RECEIVED</TableHead>
              <TableHead className="font-semibold">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <Checkbox
                    checked={selected.includes(transaction.id)}
                    onCheckedChange={(checked) => handleSelect(transaction.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-gray-600">{transaction.payee}</TableCell>
                <TableCell>
                  {getCategoryChip(transaction.category, transaction.status)}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.spent ? formatCurrency(transaction.spent) : ''}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.received ? formatCurrency(transaction.received) : ''}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={transaction.status === 'matched' ? 'text-blue-600' : 'text-blue-600'}
                  >
                    {transaction.status === 'matched' ? 'View' : 'Add'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
