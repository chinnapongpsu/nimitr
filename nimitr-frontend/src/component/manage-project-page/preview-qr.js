import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  Box,
  useTheme,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'

const PreviewQR = ({ onClosePreviewQrDialog, url, status }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  // console.log("LOGGG", onClosePreviewMarkerDialog)
  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 2,
        },
      }}
      open={status}
      keepMounted
      maxWidth="md"
      onClose={onClosePreviewQrDialog}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography>QR</Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            alignItems: 'center',
            p: 4,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '5px',
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url}
            viewBox="0 0 256 256"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosePreviewQrDialog}>
          {t('title_preview_page_close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
PreviewQR.defaultProps = {
  status: false,
  onClosePreviewQrDialog: () => { },
  url: '',
}
PreviewQR.propTypes = {
  status: PropTypes.bool,
  onClosePreviewQrDialog: PropTypes.func,
  url: PropTypes.string,
}
export default PreviewQR
