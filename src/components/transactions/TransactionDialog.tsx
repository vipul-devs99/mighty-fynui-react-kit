
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTransactions, Transaction } from '@/contexts/TransactionContext';

interface TransactionDialogProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const TransactionDialog = ({ open, onClose, transaction }: TransactionDialogProps) => {
  const { addTransaction, updateTransaction } = useTransactions();
  
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    payee: '',
    category: '',
    spent: '',
    received: '',
    status: 'unmatched' as const
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        payee: transaction.payee,
        category: transaction.category,
        spent: transaction.spent?.toString() || '',
        received: transaction.received?.toString() || '',
        status: transaction.status
      });
    } else {
      setFormData({
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        description: '',
        payee: '',
        category: 'Uncategorized',
        spent: '',
        received: '',
        status: 'unmatched'
      });
    }
  }, [transaction, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionData = {
      date: formData.date,
      description: formData.description,
      payee: formData.payee,
      category: formData.category,
      spent: formData.spent ? parseFloat(formData.spent) : null,
      received: formData.received ? parseFloat(formData.received) : null,
      status: formData.status
    };

    if (transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {transaction ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="payee">Payee</Label>
              <Input
                id="payee"
                value={formData.payee}
                onChange={(e) => setFormData({ ...formData, payee: e.target.value })}
                placeholder="Payee name"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Transaction description"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Transaction category"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="spent">Amount Spent</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={formData.spent}
                onChange={(e) => setFormData({ ...formData, spent: e.target.value, received: '' })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="received">Amount Received</Label>
              <Input
                id="received"
                type="number"
                step="0.01"
                value={formData.received}
                onChange={(e) => setFormData({ ...formData, received: e.target.value, spent: '' })}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
