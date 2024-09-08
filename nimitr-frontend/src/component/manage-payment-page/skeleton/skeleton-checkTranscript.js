import { Skeleton, Stack } from '@mui/material'

export const SkeletonCheckTranscriptPage = () => (
  <Stack spacing={2}>
    <Skeleton
      variant="rounded"
      sx={{ width: '70px', height: '40px', borderRadius: '16px' }}
    />
    <Skeleton
      variant="rectangular"
      sx={{ width: '100%', height: '55px', borderRadius: '20px' }}
    />
    <Skeleton
      variant="rectangular"
      sx={{ width: '100%', height: '550px', borderRadius: '20px' }}
    />
  </Stack>
)
