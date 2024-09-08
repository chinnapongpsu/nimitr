import { Box, Button, Grid, TextField, Typography, Stack, InputLabel, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const CheckEmail = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  return (
    <Grid container
      sx={{
        bgcolor: '#00000',
        height: { lg: '700px', xs: '300px', sm: '500px' },
        pb: '70px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -2,
        backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          // bgcolor: '#FFFFFF',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          // boxShadow: '0 0 108px rgba(0, 0, 0, 0.1)',
          height: { lg: '450px', xs: '100vh', sm: '450px' },
          width: '400px',
          paddingLeft: '50px',
          paddingRight: '50px',
          mb: '70px',
          pt: { lg: '20px', xs: '100px', sm: '0px' },
          borderRadius: '10px',
        }}>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: '20px' }}
          >
            <Box
              component="img"
              src="/NimitrIcon.png"
              sx={{
                p: 1,
                width: '80px',
                height: '80px',
                borderRadius: '20px'
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: '32px'
              }}
            >
              NIMITR
            </Typography>
          </Stack>
          <Typography variant="h5" sx={{ py: 2, fontWeight: 700, mb: '10px', }} >{t('Check_Email.title_p1')}</Typography>
          <Box sx={{ bgcolor: '#fff8ba', p: '20px', borderRadius: '10px' }}>
            <Typography variant="subtitle2" sx={{mb:'10px'}} >{t('Check_Email.title_p2')}</Typography>
            <Button variant="contained" sx={{ width: { sm: '250px', lg: '300px', xs: '250px' }, m: '5px', py: '10px', fontWeight: 700 }} onClick={() => {
              navigate('/login')
            }}>{t('Check_Email.title_p3')}</Button>
          </Box>
        </Box>
      </Box>
    </Grid>

  );
};