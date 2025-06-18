
import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Edit, Link as LinkIcon } from '@mui/icons-material';

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
        <Box className={`${getCardColor()} text-white p-4 rounded-t`}>
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="h6" className="font-semibold">
              {title}
            </Typography>
            <Box>
              <IconButton size="small" className="text-white">
                <LinkIcon />
              </IconButton>
              <IconButton size="small" className="text-white">
                <Edit />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="h4" className="font-bold">
            {bankBalance}
          </Typography>
          <Typography variant="body2" className="opacity-90">
            BANK BALANCE
          </Typography>
          <Typography variant="caption" className="opacity-75">
            {updatedTime}
          </Typography>
        </Box>
        
        <Box className="p-4 bg-white">
          <Typography variant="h5" className="font-bold text-gray-800">
            {quickbooksBalance}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-2">
            IN QUICKBOOKS
          </Typography>
          <Box className="flex justify-between items-center">
            <Typography variant="h3" className="font-bold text-blue-600">
              {transactions}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
