import { MenuItem, Typography, Select } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const LanguageSelector = ({ lang, switchLang }) => (
  <Select
    value={lang}
    size="small"
    onChange={(e) => switchLang(e.target.value)}
    sx={{
      boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
    }}
  >
    <MenuItem value="th">
      <Typography sx={{ fontWeight: 700 }}>TH</Typography>
    </MenuItem>
    <MenuItem value="en">
      <Typography sx={{ fontWeight: 700 }}>EN</Typography>
    </MenuItem>
  </Select>
)

LanguageSelector.propTypes = {
  lang: PropTypes.string.isRequired,
  switchLang: PropTypes.func.isRequired,
}

export default LanguageSelector
