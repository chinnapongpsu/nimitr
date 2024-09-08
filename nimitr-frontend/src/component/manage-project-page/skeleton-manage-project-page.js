import {
  Skeleton,
  Stack,
} from '@mui/material'

export const SkeletonManageProjectPage = () => (
  <Stack spacing={2} direction="column">
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Skeleton variant="rounded" sx={{ width: '172px', height: '45px', borderRadius: '10px' }} />
      <Skeleton variant="rounded" sx={{ width: '126px', height: '45px', borderRadius: '16px' }} />
    </Stack>
    <Stack direction="column" spacing={1}>
      <Skeleton variant="rounded" sx={{ width: '100%', height: '60px', borderRadius: '2px' }} />
      <Skeleton variant="rounded" sx={{ width: '100%', height: '300px', borderRadius: '2px' }} />
    </Stack>
  </Stack>
)
