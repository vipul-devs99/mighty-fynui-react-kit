
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert, FilterList, GetApp } from '@mui/icons-material';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(mockTransactions.map(t => t.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item.id !== id)
        : [...prev, id]
    );
  };

  const getCategoryChip = (category: string, status: string) => {
    if (status === 'matched') {
      return (
        <Chip 
          label={category}
          size="small"
          className="bg-green-100 text-green-800"
        />
      );
    }
    return (
      <Typography variant="body2" className="text-gray-600">
        {category}
      </Typography>
    );
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Box>
      <Box className="flex justify-between items-center mb-4">
        <Box className="flex items-center gap-2">
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            className="text-gray-600 border-gray-300"
          >
            All dates
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            className="text-gray-600 border-gray-300"
          >
            All transactions (25)
          </Button>
        </Box>
        
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="text-gray-500">
            1-25 of 25
          </Typography>
          <IconButton size="small">
            <GetApp />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < mockTransactions.length}
                  checked={selected.length === mockTransactions.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell className="font-semibold">DATE</TableCell>
              <TableCell className="font-semibold">DESCRIPTION</TableCell>
              <TableCell className="font-semibold">PAYEE</TableCell>
              <TableCell className="font-semibold">CATEGORIZE OR MATCH</TableCell>
              <TableCell className="font-semibold text-right">SPENT</TableCell>
              <TableCell className="font-semibold text-right">RECEIVED</TableCell>
              <TableCell className="font-semibold">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-gray-50"
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(transaction.id)}
                    onChange={() => handleSelect(transaction.id)}
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
                    variant="text" 
                    size="small"
                    className={transaction.status === 'matched' ? 'text-blue-600' : 'text-blue-600'}
                  >
                    {transaction.status === 'matched' ? 'View' : 'Add'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
