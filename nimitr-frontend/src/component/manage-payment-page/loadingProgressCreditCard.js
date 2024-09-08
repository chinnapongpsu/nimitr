import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingCreditCardProgress = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        zIndex: 9999
      }}
    >
      <CircularProgress size={100} />
      <Typography
        sx={{ fontWeight: 700, mt: 2, color: '#FFFFFF', fontSize: '36px' }}
      >
      </Typography>
    </Box>
  )
}

export default LoadingCreditCardProgress
