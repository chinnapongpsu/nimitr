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
  Box,
  TextField,
  MenuItem,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import CreateMarkerMutation from '../../graphql/mutations/createMarker'
import uploadFileToBlob from '../azure-storage-blob'
import { NimitrTextField } from '../ui/text-field'

const initialMarkerState = {
  markerName: '',
  markerType: '',
  markerPattern: '',
  markerUrl: '',
  markerNo: '',
}

const MarkerDialogCreate = ({ status, onCloseDialog, refetch }) => {
  const [selectedOption, setSelectedOption] = useState('barcode')
  const [, setInputKey] = useState(Math.random().toString(36))

  const { t } = useTranslation()

  const [, setFileUploaded] = useState('')
  const [fileSelected, setFileSelected] = useState(null)
  const [mindarrfileSelected, setmindarrfileSelected] = useState(null)

  const [uploading, setUploading] = useState(false)

  const buttonText = uploading
    ? t('content_diglog_create_edit.title_uploading')
    : t('content_diglog_create_edit.title_submit')

  const [contentMarkerState, setContentMarkerState] = useState(initialMarkerState)
  const [createMarkerMutation] = useMutation(CreateMarkerMutation)
  const [markerImage, setMarkerImage] = useState([])

  const [mindar, setmindar] = useState([])

  const onDeleteMarker = (id) => {
    setMarkerImage(markerImage.filter((x) => x.id !== id))
  }

  const updateMarkerImage = (incomingFiles) => {
    setMarkerImage(incomingFiles)
    if (incomingFiles.length !== 0) {
      const file = incomingFiles[0]?.file
      setFileSelected(file)
    } else {
      setFileSelected(null)
    }
  }
  const updateMarkerMindar = (incomingFiles) => {
    setmindar(incomingFiles)
    if (incomingFiles.length !== 0) {
      const file = incomingFiles[0]?.file
      setmindarrfileSelected(file)
    } else {
      setmindarrfileSelected(null)
    }
  }

  const handleChangeStateValue = (e) => {
    setContentMarkerState({
      ...contentMarkerState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitCreateContent = async (e) => {
    e.preventDefault()

    try {
      setUploading(true)

      if (fileSelected) {
        const response = await uploadFileToBlob(fileSelected, 'marker')
        let markerPatternset = 'success'
        const mindarresponse = await uploadFileToBlob(mindarrfileSelected, 'marker')
        if (selectedOption === 'mindar') {
          markerPatternset = mindarresponse
        }

        if (response) {
          const { data: responseMarkerContent } = await createMarkerMutation({
            variables: {
              name: contentMarkerState?.markerName,
              markerUrl: response,
              markerPattern: markerPatternset,
              markerNo: contentMarkerState?.markerNo,
              markerType: selectedOption,

            },
          })

          if (responseMarkerContent) {
            setFileSelected(null)
            setFileUploaded(fileSelected.name)
            setUploading(false)
            setInputKey(Math.random().toString(36))
          }
        } else {
          console.log('error')
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
    setContentMarkerState(initialMarkerState)
    refetch()
    setMarkerImage([])
    onCloseDialog()
  }

  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 2,
        },
      }}
      open={status}
      scroll="paper"
      keepMounted
      maxWidth="md"
    >
      <form onSubmit={handleSubmitCreateContent}>
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
          <Grid container>
            <Grid xs={12} sx={{ p: 1 }}>
              <NimitrTextField
                margin="normal"
                required
                placeholder={t('marker_dialog_create_edit.title_placeholder1')}
                id="markerName"
                name="markerName"
                value={contentMarkerState?.markerName}
                onChange={handleChangeStateValue}
                sx={{
                  '&.MuiFormControl-root': {
                    mt: 0,
                    width: '100%',
                  },
                }}
              />
              {selectedOption === 'mindar' ? (
                <Box>
                  <Typography>mindar file</Typography>
                  <Dropzone
                    require
                    onChange={updateMarkerMindar}
                    value={mindar}
                    accept=".mind"
                    style={{ minWidth: '250px' }}
                    minHeight="195px"
                    maxFiles="1"
                    view="grid"
                  >
                    {mindar.map((file) => (
                      <FileItem
                        {...file}
                        key={file.id}
                        onDelete={onDeleteMarker}
                        preview
                      />
                    ))}
                  </Dropzone>

                </Box>
              ) : null}
            </Grid>
            <Grid xs={12} sx={{ p: 1 }}>
              <Box>
                <Typography>{t('marker_dialog_create_edit.title_p2')}</Typography>
                <Dropzone
                  require
                  onChange={updateMarkerImage}
                  value={markerImage}
                  accept=".png,.jpg"
                  style={{ minWidth: '250px' }}
                  minHeight="195px"
                  maxFiles="1"
                  view="grid"
                >
                  {markerImage.map((file) => (
                    <FileItem
                      {...file}
                      key={file.id}
                      onDelete={onDeleteMarker}
                      preview
                    />
                  ))}
                </Dropzone>
              </Box>
            </Grid>
            <Grid xs={12} sx={{ p: 1 }}>
              <NimitrTextField
                margin="normal"
                required
                placeholder={t('marker_dialog_create_edit.title_placeholder2')}
                id="markerNo"
                name="markerNo"
                value={contentMarkerState?.markerNo}
                onChange={handleChangeStateValue}
                inputProps={{ maxLength: 62 }}
                sx={{
                  '&.MuiFormControl-root': {
                    mt: 0,
                    width: '100%',
                  },
                }}
              />
              <TextField
                id="outlined-select-currency"
                select
                size="small"
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value) // Fix the setSelectedOption value
                }}
                sx={{
                  mt: 1, // Adjust the margin
                  width: '400px',
                }}
              >
                <MenuItem value="mindar">Mindar</MenuItem>
                <MenuItem value="barcode">Barcode</MenuItem>
                <MenuItem value="nft">Nft</MenuItem>

              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            endIcon={<Publish />}
            sx={{ fontWeight: 700 }}
            disabled={!fileSelected || !contentMarkerState?.markerName}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

MarkerDialogCreate.defaultProps = {
  status: false,
  onCloseDialog: () => { },
  refetch: () => { },
}

MarkerDialogCreate.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
}

export default MarkerDialogCreate
