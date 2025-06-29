import { Box } from '@mui/material';
import React from 'react';

interface BoxHeaderProps {
  children: React.ReactNode; 
}

const BoxHeader: React.FC<BoxHeaderProps> = ({ children }) => {
  return (
    <Box 
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default BoxHeader;