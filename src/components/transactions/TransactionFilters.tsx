
import React from 'react';
import { Box, Chip, Button, Typography } from '@mui/material';
import { VideoLibrary, Tour } from '@mui/icons-material';

const TransactionFilters = () => {
  return (
    <Box className="flex justify-between items-center mb-6">
      <Box className="flex items-center gap-2">
        <Chip 
          label="For review (25)"
          className="bg-gray-700 text-white"
        />
        <Chip 
          label="Categorized"
          variant="outlined"
          className="border-gray-300"
        />
        <Chip 
          label="Excluded"
          variant="outlined"
          className="border-gray-300"
        />
      </Box>
      
      <Box className="flex items-center gap-3">
        <Button
          startIcon={<VideoLibrary />}
          variant="text"
          className="text-blue-600"
        >
          Video tutorials
        </Button>
        <Button
          startIcon={<Tour />}
          variant="text"
          className="text-blue-600"
        >
          Take a tour
        </Button>
        <Button
          variant="text"
          className="text-blue-600"
        >
          Go to bank register
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionFilters;
