
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  payee: string;
  category: string;
  spent: number | null;
  received: number | null;
  status: 'matched' | 'unmatched' | 'excluded';
}

interface TransactionContextType {
  transactions: Transaction[];
  selectedTransactions: string[];
  filterStatus: string;
  dateFilter: string;
  searchQuery: string;
  setTransactions: (transactions: Transaction[]) => void;
  setSelectedTransactions: (selected: string[]) => void;
  setFilterStatus: (status: string) => void;
  setDateFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  categorizeTransaction: (id: string, category: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

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

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const categorizeTransaction = (id: string, category: string) => {
    updateTransaction(id, { category, status: 'matched' });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        selectedTransactions,
        filterStatus,
        dateFilter,
        searchQuery,
        setTransactions,
        setSelectedTransactions,
        setFilterStatus,
        setDateFilter,
        setSearchQuery,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        categorizeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
