import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CustomBackdrop = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#FFD102'
      }}
    >
      <CircularProgress size={100} color="inherit" />
    </Backdrop>
  );
};

export default CustomBackdrop;
