
import React, { useState, useMemo } from 'react';
import { FilterIcon, Download, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTransactions, Transaction } from '@/contexts/TransactionContext';
import TransactionDialog from './TransactionDialog';

const TransactionTable = () => {
  const {
    transactions,
    selectedTransactions,
    setSelectedTransactions,
    filterStatus,
    searchQuery,
    setSearchQuery,
    deleteTransaction,
    categorizeTransaction,
  } = useTransactions();
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Transaction>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort transactions
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [transactions, filterStatus, searchQuery, sortBy, sortOrder]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedTransactions(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(item => item !== id)
    );
  };

  const handleSort = (column: keyof Transaction) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    setSelectedTransactions(prev => prev.filter(item => item !== id));
  };

  const handleCategorize = (id: string, category: string) => {
    categorizeTransaction(id, category);
  };

  const handleBulkDelete = () => {
    selectedTransactions.forEach(id => deleteTransaction(id));
    setSelectedTransactions([]);
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
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          {selectedTransactions.length > 0 && (
            <Button
              variant="outline"
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected ({selectedTransactions.length})
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            1-{filteredTransactions.length} of {filteredTransactions.length}
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
                  checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                DATE {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('description')}
              >
                DESCRIPTION {sortBy === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="font-semibold">PAYEE</TableHead>
              <TableHead className="font-semibold">CATEGORIZE OR MATCH</TableHead>
              <TableHead className="font-semibold text-right">SPENT</TableHead>
              <TableHead className="font-semibold text-right">RECEIVED</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
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
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {transaction.status === 'unmatched' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Categorize
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleCategorize(transaction.id, 'Office Supplies')}>
                            Office Supplies
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCategorize(transaction.id, 'Travel')}>
                            Travel
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCategorize(transaction.id, 'Meals')}>
                            Meals
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCategorize(transaction.id, 'Income')}>
                            Income
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TransactionDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTransaction(null);
        }}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default TransactionTable;
