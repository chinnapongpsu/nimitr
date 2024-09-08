import { useMutation } from '@apollo/client'
import { DeleteOutline, Edit } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Paper,
  Button,
  useTheme,
  Typography,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import RemoveMarkerMutation from '../../graphql/mutations/removeMarker'

const MarkerList = ({
  markerData,
  refetch,
  handleOpenPreviewMarker,
  toggleEditDialog,
  markerContent,
  setMarkerContent,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [removeMarkerMutation] = useMutation(RemoveMarkerMutation)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [markerId, setmarkerId] = useState()

  const handleEditMarker = (marker) => {
    setMarkerContent({
      ...markerContent,
      id: marker?._id,
      name: marker?.name,
      markerNo: marker?.markerNo,
      markerUrl: marker?.markerUrl,
      markerPattern: marker?.markerPattern,
      status: marker?.markerStatus,
    })
    toggleEditDialog()
  }

  const handleRemoveMarker = (MarkerId) => async (e) => {
    e.preventDefault()
    try {
      const { data: responseRemoveMarker } = await removeMarkerMutation({
        variables: {
          _id: MarkerId,
          status: 'MARKER_DELETE',
        },
      })

      if (responseRemoveMarker) {
        refetch()
        handleCloseRemoveDialog()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenRemoveDialog = (params) => {
    setDialogOpen(true)
    setmarkerId(params.id)
  }

  const handleCloseRemoveDialog = () => {
    setDialogOpen(false)
  }

  const columns = [
    { field: 'index', headerName: '#', width: 50 },
    {
      field: 'name',
      headerName: t('content_list.title_headerName1'),
      width: 300,
    },
    {
      field: 'marker',
      headerName: t('content_list.title_headerName2'),
      width: 150,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => (
        <Tooltip title={t('content_list.title_p1')}>
          <Button
            onClick={() => handleOpenPreviewMarker(params.value, params.row.name)}
          >
            <Box
              component="img"
              src={params.value}
              sx={{
                width: '50px',
                height: '50px',
                p: 1,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '5px',
              }}
            />
          </Button>
        </Tooltip>
      ),
    },
    {
      field: 'no',
      headerName: t('content_list.title_marker_list_headerName3'),
      width: 70,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: t('content_list.title_headerName4'),
      width: 120,
      renderCell: (params) => (
        <Box align="center" sx={{ fontWeight: 700 }}>
          {params.value[0] === 'MARKER_ALIVE' ? (
            <Chip label={t('content_list.title_label1')} color="success" sx={{ width: '100px' }} />
          ) : (
            <Chip label="DELETE" color="primary" sx={{ width: '100px' }} />
          )}
        </Box>
      ),
    },
    {
      field: 'manager',
      headerName: t('content_list.title_headerName5'),
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title={t('content_list.title_marker_list_p4')}>
            <IconButton
              sx={{
                backgroundColor: theme.palette.primary.lightGray,
                boxShadow: 5,
                m: 1,
              }}
              onClick={() => {
                handleEditMarker(params.value[0])
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('content_list.title_marker_list_p5')}>
            <IconButton
              sx={{
                backgroundColor: theme.palette.primary.lightGray,
                boxShadow: 5,
                m: 1,
              }}
              onClick={() => handleOpenRemoveDialog(params)}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>

        </>
      ),
    },
  ]

  const rows = markerData?.markers?.map((marker, index) => ({
    id: marker?._id,
    name: marker?.name,
    marker: marker?.markerUrl,
    no: marker?.markerNo,
    status: [marker?.markerStatus, marker?._id],
    manager: [marker],
    index: index + 1,
  }))

  return (
    <Box
      component={Paper}
      sx={{
        mt: 2,
        boxShadow: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiTableCell-head': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />

      {!markerData?.markers?.length && (
        <Paper
          elevation={3}
          sx={{
            mt: 0,
            bgcolor: theme?.palette?.primary?.main,
            color: 'white',
            width: '100%',
            height: '450px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" fontWeight={700}>
            {t('content_list.title_marker_list_emptry_marker')}
          </Typography>
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseRemoveDialog}>
        <DialogTitle>{t('content_list.title_marker_list_p5')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('content_list.title_p6')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog}>{t('content_list.title_cancel')}</Button>
          <div>
            <IconButton
              sx={{
                backgroundColor: theme.palette.primary.lightGray,
              }}
              onClick={handleRemoveMarker(markerId)}
              autoFocus
            >
              <DeleteOutline />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>

    </Box>
  )
}

MarkerList.defaultProps = {
  markerData: {},
  refetch: () => { },
  handleOpenPreviewMarker: () => { },
  toggleEditDialog: () => { },
  markerContent: {},
  setMarkerContent: () => { },
}

MarkerList.propTypes = {
  markerData: PropTypes.shape({
    markers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      markerUrl: PropTypes.string,
      markerNo: PropTypes.string,
      markerStatus: PropTypes.string,
    })),
  }),
  refetch: PropTypes.func,
  handleOpenPreviewMarker: PropTypes.func,
  toggleEditDialog: PropTypes.func,
  markerContent: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    markerNo: PropTypes.string,
    markerUrl: PropTypes.string,
    markerPattern: PropTypes.string,
    status: PropTypes.bool,
  }),
  setMarkerContent: PropTypes.func,
}

export default MarkerList
