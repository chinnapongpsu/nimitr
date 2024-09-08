import { Dropzone, FileItem } from '@dropzone-ui/react'
import { Checkbox, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types' // Import prop-types
import React from 'react'

const SoundCheckbox = ({
  t,
  isChecked,
  handleCheckboxChange,
  updatesoundfile,
  soundFile,
  onDeletesoundfile,
  quser
}) => {
  return (
    <>
      <Stack>
        <Typography component="div" sx={{ fontWeight: 700 }}>
          {t('marker_dialog_create_edit.title_Sound')}
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </Typography>
        {isChecked && (
          <Dropzone
            required
            onChange={updatesoundfile}
            value={soundFile}
            width="100%"
            accept=".mp3"
            minHeight="195px"
            maxFiles="1"
            disableScroll
            view="grid"
          >
            {soundFile.length > 0 ? (
              soundFile.map((sfile) => (
                <FileItem
                  {...sfile}
                  key={sfile.id}
                  onDelete={() => onDeletesoundfile(sfile.id)} // Call the function with the file ID
                  preview
                />
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '12px',
                  color: 'red'
                }}
              >
                {t('content_list.title_p11')} {quser?.maxsizeaudio}MB
              </Typography>
            )}
          </Dropzone>
        )}
      </Stack>
    </>
  )
}

SoundCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  updatesoundfile: PropTypes.func.isRequired,
  soundfile: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  onDeletesoundfile: PropTypes.func.isRequired
}

export default SoundCheckbox
