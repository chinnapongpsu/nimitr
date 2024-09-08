import React, { useState } from 'react'
import { Info } from '@mui/icons-material'
import {
  Switch, // Import the Switch component from '@mui/material'
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material'
import PropTypes from 'prop-types'

const SwitchButtonFileDropzone = ({
  t,
  SwitchButtonFileDropzone,
  handleSwitchFileDropzoneChange
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography component="div" sx={{ fontWeight: 700 }}>
        {t('content_list.title_p22')}
        <Switch // Use the Switch component for toggling
          checked={SwitchButtonFileDropzone}
          onChange={handleSwitchFileDropzoneChange}
        />
      </Typography>
    </Stack>
  )
}

SwitchButtonFileDropzone.propTypes = {
  SwitchButtonFileDropzone: PropTypes.bool.isRequired,
  handleSwitchFileDropzoneChange: PropTypes.func.isRequired
}

export default SwitchButtonFileDropzone
