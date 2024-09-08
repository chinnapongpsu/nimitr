import { useMutation } from '@apollo/client'
import { Dropzone, FileItem } from '@dropzone-ui/react'
import { Close, Publish } from '@mui/icons-material'
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import UpdateMarkerMutation from '../../graphql/mutations/updateMarker'
import uploadFileToBlob from '../azure-storage-blob'
import { NimitrTextField } from '../ui/text-field'

const MarkerDialogEdit = ({
  status,
  toggleDialog,
  refetch,
  markerContent,
  setMarkerContent,
}) => {
  const { t } = useTranslation()
  const [fileSelected, setFileSelected] = useState()
  const [uploading, setUploading] = useState(false)

  const buttonText = uploading
    ? t('content_diglog_create_edit.title_uploading')
    : t('content_diglog_create_edit.title_submit')

  const [updateMarkerMutation] = useMutation(UpdateMarkerMutation)
  const handleChangeStateValue = (e) => {
    setMarkerContent({ ...markerContent, [e.target.name]: e.target.value })
  }

  const onDeleteMarkerUrl = (id) => {
    setMarkerUrl(markerUrl.filter((x) => x.id !== id))
  }

  const [markerUrl, setMarkerUrl] = useState([])

  const updateMarkerUrl = (incomingFiles) => {
    setMarkerUrl(incomingFiles)
    if (incomingFiles.length !== 0) {
      const file = incomingFiles[0]?.file
      setFileSelected(file)
    } else {
      setFileSelected(null)
    }
  }

  const handleSubmitUpdateMarker = async (e) => {
    e.preventDefault()
    try {
      setUploading(true)
      if (fileSelected) {
        const markerimage = await uploadFileToBlob(fileSelected)
        if (markerimage) {
          const { data: responseMarkerContent } = await updateMarkerMutation({
            variables: {
              id: markerContent?.id,
              name: markerContent?.name,
              markerUrl: markerimage,
            },
          })
          if (responseMarkerContent) {
            handleRefresh()
          }
        }
      } else {
        console.log('No file selected')
      }
    } catch (error) {
      console.error(error)
    }
    handleRefresh()
  }

  const handleRefresh = () => {
    refetch()
    toggleDialog()
  }

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
    >
      <form onSubmit={handleSubmitUpdateMarker}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItem: 'center',
          }}
        >
          <Typography
            sx={{
              justifyItems: 'center',
              alignSelf: 'center',
              fontWeight: 900,
            }}
          >
            {t('marker_dialog_create_edit.title_p1')}
          </Typography>
          <IconButton onClick={handleRefresh}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ width: '400px' }}>
            <NimitrTextField
              margin="normal"
              required
              placeholder={t('marker_dialog_create_edit.title_placeholder1')}
              id="name"
              name="name"
              value={markerContent?.name}
              onChange={handleChangeStateValue}
              sx={{
                '&.MuiFormControl-root': {
                  width: '100%',
                  mt: 1,
                },
              }}
            />

            <Dropzone
              onChange={updateMarkerUrl}
              value={markerUrl}
              style={{ minWidth: '250px' }}
              required
              accept=".png"
              minHeight="195px"
              maxFiles="1"
              view="grid"
            >
              {markerUrl.map((file) => (
                <FileItem
                  {...file}
                  key={file.id}
                  onDelete={onDeleteMarkerUrl}
                  preview
                />
              ))}
            </Dropzone>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            endIcon={<Publish />}
            sx={{ fontWeight: 700 }}
            disabled={!markerContent?.name}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

MarkerDialogEdit.defaultProps = {
  status: false,
  toggleDialog: () => { },
  refetch: () => { },
  markerContent: {},
  setMarkerContent: () => { },
}

MarkerDialogEdit.propTypes = {
  status: PropTypes.bool,
  toggleDialog: PropTypes.func,
  refetch: PropTypes.func,
  markerContent: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  setMarkerContent: PropTypes.func,
}

export default MarkerDialogEdit
