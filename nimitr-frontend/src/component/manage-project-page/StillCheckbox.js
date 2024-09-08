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

const StillCheckbox = ({ t, isCheckedStill, handleCheckboxStillChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInfoClick = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography component="div" sx={{ fontWeight: 700 }}>
        {t('marker_dialog_create_edit.title_Still')}
        <Switch // Use the Switch component for toggling
          checked={isCheckedStill}
          onChange={handleCheckboxStillChange}
        />
      </Typography>
      <IconButton onClick={handleInfoClick}>
        <Info sx={{ color: '#FFD102' }} />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t('marker_dialog_create_edit.title_Still')}
        </DialogTitle>
        <DialogContent>
          {t('marker_dialog_create_edit.title_Still_Info')}
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

StillCheckbox.propTypes = {
  isCheckedStill: PropTypes.bool.isRequired,
  handleCheckboxStillChange: PropTypes.func.isRequired
}

export default StillCheckbox
