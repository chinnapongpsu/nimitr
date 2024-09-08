import { Skeleton, Grid } from '@mui/material'

export const SkeletonPaymentPage = () => (
  <Grid container spacing={2}>
    <Grid
      item
      xs={12}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Skeleton
        variant="text"
        animation="wave"
        height={70}
        sx={{
          fontSize: {
            xs: '28px',
            sm: '48px',
            md: '48px',
            lg: '48px'
          },
          mt: 10,
          mb: 7,
          width: '50%'
        }}
      />
    </Grid>
    <Grid
      item
      xs={12}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Skeleton
        variant="text"
        animation="wave"
        height={60}
        sx={{ width: '50%', mb: 10 }}
      />
    </Grid>
    <Skeleton variant="rounded" sx={{ width: '100%', height: '560px' }} />
  </Grid>
)
