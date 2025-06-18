
import React from 'react';
import { 
  Dashboard, 
  AccountBalance, 
  Receipt, 
  TrendingUp, 
  Inventory, 
  Assessment 
} from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';

const menuItems = [
  { icon: Dashboard, text: 'Dashboard', active: false },
  { icon: AccountBalance, text: 'Assets', active: false },
  { icon: AccountBalance, text: 'Liabilities', active: false },
  { icon: Receipt, text: 'Transactions', active: true },
  { icon: TrendingUp, text: 'Sales & Orders', active: false },
  { icon: Inventory, text: 'Inventory', active: false },
  { icon: Assessment, text: 'Reports', active: false },
];

const Sidebar = () => {
  return (
    <Box className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <Box className="p-4">
        <Typography variant="h6" className="font-bold text-red-600">
          MIGHTY WARNERS
        </Typography>
      </Box>
      
      <List className="px-2">
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            className={`rounded-lg mb-1 cursor-pointer ${
              item.active 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            <ListItemIcon className={item.active ? 'text-blue-600' : 'text-gray-500'}>
              <item.icon />
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              className={item.active ? 'text-blue-600' : 'text-gray-700'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
