
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { Settings, Update, Explore, KeyboardArrowDown } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" className="bg-pink-100 shadow-sm" elevation={0}>
      <Toolbar className="justify-between">
        <Box className="flex items-center gap-4">
          <Typography variant="h6" className="text-gray-700">
            🏠 Mighty War...
          </Typography>
        </Box>
        
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="text-gray-600">
            Home Office
          </Typography>
          <Typography variant="body2" className="text-gray-700 font-semibold">
            Mightywarners LLC...
          </Typography>
          <KeyboardArrowDown className="text-gray-600" />
          <Box className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center">
            <Typography variant="caption" className="text-white font-bold">
              🇮🇳
            </Typography>
          </Box>
          <Box className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
            <Typography variant="caption" className="text-white font-bold">
              9
            </Typography>
          </Box>
          <Avatar className="w-8 h-8" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
