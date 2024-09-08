import {
  Box,
  Typography,
  LinearProgress,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

export const LinearProgressWithLabel = ({ value, ...props }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" {...props} value={value} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
    </Box>
  </Box>
)

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired, // Add prop validation for 'value'
}
