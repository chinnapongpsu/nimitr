import { Grid, Typography, Box, Container } from '@mui/material'

const HeaderText = ({ t }) => {
  return (
    <Container maxWidth="xl">
      <Grid container sx={{ py: 10 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: '28px',
                  sm: '38px',
                  md: '42px',
                  lg: '48px'
                }
              }}
            >
              {t('headtext_compo.title_p1')}
            </Typography>
            <Typography sx={{ fontSize: '20px' }}>
              {t('headtext_compo.title_p2')}
              <br />
              {t('headtext_compo.title_p3')}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
        >
          <Box
            alt="nimitr-icon"
            component="img"
            src="/NimitrIcon.png"
            sx={{
              width: '50%',
              height: 'auto',
              borderRadius: 5
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
export default HeaderText
