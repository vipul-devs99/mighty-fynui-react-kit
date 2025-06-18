
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const TransactionTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="border-b border-gray-200 mb-6">
      <Tabs 
        value={value} 
        onChange={handleChange}
        className="min-h-0"
        TabIndicatorProps={{
          className: "bg-green-500 h-1"
        }}
      >
        <Tab 
          label="Bank transactions" 
          className={`text-sm normal-case ${value === 0 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="App transactions" 
          className={`text-sm normal-case ${value === 1 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="Receipts" 
          className={`text-sm normal-case ${value === 2 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="Reconcile" 
          className={`text-sm normal-case ${value === 3 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="Rules" 
          className={`text-sm normal-case ${value === 4 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="Chart of accounts" 
          className={`text-sm normal-case ${value === 5 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
        <Tab 
          label="Recurring transactions" 
          className={`text-sm normal-case ${value === 6 ? 'text-green-600 font-semibold' : 'text-gray-600'}`}
        />
      </Tabs>
    </Box>
  );
};

export default TransactionTabs;
