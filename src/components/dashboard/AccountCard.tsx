
import React from 'react';
import { Edit, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AccountCardProps {
  title: string;
  bankBalance: string;
  quickbooksBalance: string;
  transactions: number;
  type: 'checking' | 'savings' | 'credit';
  updatedTime: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  bankBalance,
  quickbooksBalance,
  transactions,
  type,
  updatedTime
}) => {
  const getCardColor = () => {
    switch (type) {
      case 'checking':
        return 'bg-blue-500';
      case 'savings':
        return 'bg-gray-500';
      case 'credit':
        return 'bg-gray-400';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className={`${getCardColor()} text-white p-4 rounded-t`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              {title}
            </h3>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 h-auto">
                <LinkIcon className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 h-auto">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-2xl font-bold">
            {bankBalance}
          </div>
          <div className="text-sm opacity-90">
            BANK BALANCE
          </div>
          <div className="text-xs opacity-75">
            {updatedTime}
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <div className="text-xl font-bold text-gray-800">
            {quickbooksBalance}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            IN QUICKBOOKS
          </div>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-blue-600">
              {transactions}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
