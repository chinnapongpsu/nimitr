import {
  Box, Grid,
} from '@mui/material'
import PropTypes from 'prop-types'

import { HeaderBar } from './header-bar'

export const LandingLayout = ({ children }) => (
  <Grid sx={{ height: '100vh' }}>
    <HeaderBar />
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Grid>
)
LandingLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
