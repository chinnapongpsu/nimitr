import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const DownloadUriDialog = ({ downloadUri, _id, t }) => {
  const navigate = useNavigate()

  return (
    <Dialog
      open={Boolean(downloadUri)}
      sx={{ maxWidth: '100%', width: '100%' }}
      PaperProps={{
        sx: {
          position: 'absolute',
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <img
            src={downloadUri}
            alt="Prompt Pay code"
            style={{ width: '100%', height: 'auto' }}
          />
          <Button
            onClick={() => {
              navigate(`/payment/checking/${_id}`)
            }}
            variant="contained"
            sx={{ width: '100%', fontSize: '18px' }}
          >
            {t('payment_page.title_p39')}
          </Button>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default DownloadUriDialog
