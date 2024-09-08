import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingPromptPayProgress = () => {
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
    </Box>
  )
}

export default LoadingPromptPayProgress
