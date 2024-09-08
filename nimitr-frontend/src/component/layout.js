import {
  Box, Grid,
} from '@mui/material'
import PropTypes from 'prop-types'

import { HeaderBar } from './header-bar'

export const Layout = ({ children }) => (
  <Grid sx={{ height: '100vh' }}>
    <HeaderBar />
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Grid>
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
