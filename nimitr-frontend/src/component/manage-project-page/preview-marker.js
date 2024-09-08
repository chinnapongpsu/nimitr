import { Close } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  IconButton,
  Box,
  useTheme
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const PreviewMarker = ({ onClosePreviewMarkerDialog, url, name, status }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 2
        }
      }}
      open={status}
      keepMounted
      maxWidth="lg"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItem: 'center'
        }}
      >
        <Typography sx={{ justifyItems: 'center', alignSelf: 'center' }}>
          {t('content_diglog_create_edit.title_head2')}
        </Typography>
        <IconButton onClick={onClosePreviewMarkerDialog}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack spacing={1} direction="column" sx={{ alignItems: 'center' }}>
          <Box
            component="img"
            src={url}
            sx={{
              p: 1,
              width: { xs: '200px', sm: '400px' },
              objectFit: 'contain',
              height: { xs: 'auto', sm: '300px' },
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '10px'
            }}
          />
          <Typography>{name}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
PreviewMarker.propTypes = {
  onClosePreviewMarkerDialog: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired
}
export default PreviewMarker
