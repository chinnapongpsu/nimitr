import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PaymentButton = ({
  params,
  setPrice,
  openDialog,
  buttonText,
  disabledCondition,
  packageName
}) => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.stopPropagation() // Add this line to stop event propagation
    if (!params?.memberUserId) {
      navigate('/project')
    } else {
      setPrice(
        packageName === 'Starter'
          ? 300
          : packageName === 'Premium'
          ? 800
          : 2000
      )
      openDialog()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {!params?.memberUserId && (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            fontWeight: 700,
            maxWidth: {
              xs: '70%',
              sm: '60%',
              md: '50%',
              lg: '50%',
              xl: '100%'
            },
            width: '100%',
            height: '50px',
            borderRadius: 10
          }}
        >
          {buttonText}
        </Button>
      )}
      {params?.memberUserId && (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            fontWeight: 700,
            maxWidth: {
              xs: '70%',
              sm: '60%',
              md: '50%',
              lg: '50%',
              xl: '100%'
            },
            width: '100%',
            height: '50px',
            color: '#000000',
            borderRadius: 10
          }}
          disabled={disabledCondition}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  )
}

export default PaymentButton
