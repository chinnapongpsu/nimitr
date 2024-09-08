import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ButtonFree = ({}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate('/project')
        }}
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
      >
        {t('payment_page.title_p24')}
      </Button>
    </Box>
  )
}
export default ButtonFree
