
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AccountCard from '../components/dashboard/AccountCard';
import TransactionTabs from '../components/transactions/TransactionTabs';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#10b981',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <Box className="flex-1">
          <Header />
          
          <Box className="p-6">
            <Box className="flex justify-between items-center mb-6">
              <Typography variant="h4" className="font-bold text-gray-800">
                Transactions
              </Typography>
              <Box className="flex items-center gap-3">
                <Button
                  variant="outlined"
                  className="text-gray-600 border-gray-300"
                >
                  Link account
                </Button>
                <Button
                  variant="contained"
                  startIcon={<span>🔄</span>}
                  className="bg-blue-600"
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<span>🔍</span>}
                  className="text-gray-600 border-gray-300"
                >
                  Explore
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3} className="mb-8">
              <Grid item xs={12} md={4}>
                <AccountCard
                  title="Checking"
                  bankBalance="$3,621.93"
                  quickbooksBalance="$1,201.00"
                  transactions={25}
                  type="checking"
                  updatedTime="Updated moments ago"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountCard
                  title="Savings"
                  bankBalance="$200.00"
                  quickbooksBalance="$800.00"
                  transactions={1}
                  type="savings"
                  updatedTime="Updated moments ago"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AccountCard
                  title="Mastercard"
                  bankBalance="$304.96"
                  quickbooksBalance="$157.72"
                  transactions={7}
                  type="credit"
                  updatedTime="Updated moments ago"
                />
              </Grid>
            </Grid>

            <TransactionTabs />
            <TransactionFilters />
            <TransactionTable />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
