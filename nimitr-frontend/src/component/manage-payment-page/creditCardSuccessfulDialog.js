import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'
import { Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const CreditCardSuccessfulDialog = ({ charge, t }) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (charge) {
      setOpen(true)
    }
  }, [charge])

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogContent>
        <DialogContentText>
          {charge ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '30%',
                  paddingBottom: '30%',
                  borderRadius: '50%',
                  position: 'relative',
                  bgcolor: 'green'
                }}
              >
                <Check
                  sx={{
                    fontSize: {
                      xs: '10vw',
                      sm: '12vw',
                      md: '12vw',
                      lg: '8vw'
                    },
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </Box>
              <Box xs={12}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    textAlign: 'center',
                    mt: 2,
                    fontSize: 30,
                    color: 'black'
                  }}
                >
                  {charge.status} !
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  mt: 3,
                  fontWeight: 700
                }}
              >
                {t('payment_page.title_p40')}
              </Typography>

              <Typography
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  mt: 1,
                  fontWeight: 700,
                  fontSize: '36px'
                }}
              >
                ฿
                {charge.amount >= 1000
                  ? (charge.amount / 100).toLocaleString()
                  : charge.amount / 100}
              </Typography>
            </>
          ) : (
            // Display a circular progress indicator while loading
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center', // Horizontal centering
          alignItems: 'center' // Vertical centering
        }}
      >
        {charge ? (
          <Button
            sx={{
              fontWeight: 700,
              borderRadius: 5,
              bgcolor: 'green',
              color: '#FFFFFF',
              maxWidth: '20%',
              width: '100%'
            }}
            variant="contained"
            onClick={() => {
              navigate('/project')
            }}
          >
            {t('payment_page.title_p41')}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

export default CreditCardSuccessfulDialog
