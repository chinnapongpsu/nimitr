import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const StartProject = ({}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box xs={12} sx={{ mt: 10 }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '24px',
            sm: '32px',
            md: '32px',
            lg: '36px',
            lg: '38px'
          },
          textShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)'
        }}
      >
        {t('project_list.title_p1')}
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: 700, textAlign: 'center', mt: 3.5 }}>
        {t('payment_page.title_p25')}
      </Typography>
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
            color: '#000000',
            border: '2px solid white',
            borderRadius: 10,
            maxWidth: { xs: '50%', sm: '30%', md: '30%', lg: '30%', xl: '30%' },
            width: '100%',
            mt: 3.5,
            mb: 3.5
          }}
        >
          {t('payment_page.title_p24')}
        </Button>
      </Box>
    </Box>
  )
}
export default StartProject
