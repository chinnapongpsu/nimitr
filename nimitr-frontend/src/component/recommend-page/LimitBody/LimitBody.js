import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import FileLimitBodyTable from './FileLimitBodyTable'
import PackageFileLimitTable from './PackageFileLimitTable'

const LimitBody = ({ theme, t }) => {
  return (
    <Grid sx={{ backgroundColor: theme.palette.primary.yellow, py: 5 }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: {
            xs: '28px',
            sm: '38px',
            md: '42px',
            lg: '48px'
          }
        }}
      >
        {t('filelimitbody_compo.title_p10')}
      </Typography>
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: '28px',
              sm: '38px',
              md: '42px',
              lg: '48px'
            },
            pt: 10
          }}
        >
          {t('filelimitbody_compo.title_p11')}
        </Typography>
        <FileLimitBodyTable theme={theme} t={t} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: '28px',
              sm: '38px',
              md: '42px',
              lg: '48px'
            },
            pt: 10
          }}
        >
          {t('filelimitbody_compo.title_p12')}
        </Typography>
        <PackageFileLimitTable theme={theme} t={t} />
      </Container>
    </Grid>
  )
}
export default LimitBody
