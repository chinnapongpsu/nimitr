import { Skeleton, Stack } from '@mui/material'

export const SkeletonMainPage = () => (
  <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
    <Skeleton
      variant="rounded"
      sx={{ width: '164px', height: '40px', borderRadius: '16px' }}
    />
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '160px', borderRadius: '20px' }}
    />
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '160px', borderRadius: '20px' }}
    />
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '160px', borderRadius: '20px' }}
    />
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '160px', borderRadius: '20px' }}
    />
  </Stack>
)
