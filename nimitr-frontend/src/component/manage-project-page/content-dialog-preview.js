import { Close, Download } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import * as htmlToImage from 'html-to-image'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'

const ContentDialogPreview = ({
  status,
  onCloseDialog,
  qr,
  marker,
  content
}) => {
  const theme = useTheme()
  const domEl = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const { t } = useTranslation()

  const buttonText = downloading
    ? t('content_dialog_preview.title_downloading2')
    : t('content_dialog_preview.title_downloading1')

  const handleDownloadImage = async () => {
    try {
      setDownloading(true)
      const dataUrl = await htmlToImage.toJpeg(domEl.current)

      const link = document.createElement('a')
      link.download = `${content?.contentName}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error while downloading image:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 2
        }
      }}
      open={status}
      keepMounted
      maxWidth="xl"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography>{`${content?.contentName}`}</Typography>
        <IconButton onClick={onCloseDialog}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box align="center" mt="20" minHeight="50vh">
          <Box
            ref={domEl}
            id="domEl"
            sx={{
              backgroundColor: 'white',
              width: '1000px',
              height: '400px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                flexDirection: 'row',
                width: '1000px',
                height: '350px',
                padding: '10px',
                justifyContent: 'center'
              }}
            >
              <Box
                className="qr_img"
                sx={{
                  width: '300px',
                  height: '300px',
                  marginRight: '15px',
                  textAlign: 'start'
                }}
              >
                <Typography sx={{ padding: '5px' }}>
                  (1) {t('content_dialog_preview.title_head1')}
                </Typography>
                <QRCode
                  size={256}
                  style={{
                    width: '300px',
                    height: '300px',
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: '5px'
                  }}
                  value={qr}
                  viewBox="0 0 256 256"
                />
              </Box>

              <Box
                sx={{
                  width: '300px',
                  height: '300px',
                  marginRight: '15px',
                  textAlign: 'start'
                }}
              >
                <Typography sx={{ padding: '5px' }}>
                  (2) {t('content_dialog_preview.title_head2')}
                </Typography>
                <img
                  src={`${marker?.markerUrl}`}
                  alt="logo"
                  style={{
                    width: '300px',
                    height: '300px',
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: '5px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>

            <Box
              align="center"
              className="text_title"
              sx={{
                textAlign: 'center',
                gridColumn: '1 / span 4',
                gridRow: '4'
              }}
            >
              {t('content_dialog_preview.title_p1')}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDownloadImage}
          variant="contained"
          disabled={downloading}
          sx={{ fontWeight: 700 }}
          endIcon={<Download />}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ContentDialogPreview.propTypes = {
  status: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  qr: PropTypes.string.isRequired,
  marker: PropTypes.shape({
    markerUrl: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.shape({
    contentName: PropTypes.string.isRequired
  }).isRequired
}

export default ContentDialogPreview
