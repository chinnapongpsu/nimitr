import { useQuery } from '@apollo/client'
import { NavigateNext } from '@mui/icons-material'
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import PreviewMarker from '../component/manage-project-page/preview-marker'
import { SkeletonManageProjectPage } from '../component/manage-project-page/skeleton-manage-project-page'
import MarkerDialogCreate from '../component/marker-control-page/marker-dialog-create'
import MarkerDialogEdit from '../component/marker-control-page/marker-dialog-edit'
import MarkerList from '../component/marker-control-page/marker-list'
import markers from '../graphql/queries/markers'

const initialPreviewMarkerState = {
  markerName: '',
  markerUrl: '',
  status: false,
}

const initialMarkerState = {
  id: '',
  name: '',
  markerUrl: '',
  markerPattern: '',
  status: false,
}

export const MarkerControlPage = () => {
  const [dialogCreateMarkerStatus, setDialogCreateMarkerStatus] = useState(false)
  const [markerContent, setMarkerContent] = useState(initialMarkerState)
  const [previewMarkerStatus, setPreviewMarkerStatus] = useState(initialPreviewMarkerState)
  const [dialogEditMarkerStatus, setDialogEditMarkerStatus] = useState(false)

  const handleOpenPreviewMarker = (url, name) => {
    setPreviewMarkerStatus({
      ...previewMarkerStatus,
      markerName: name,
      markerUrl: url,
      status: true,
    })
  }
  const { t } = useTranslation()

  const handleClosePreviewMarker = () => {
    setPreviewMarkerStatus(initialPreviewMarkerState)
  }

  const handleToggleEditDialog = () => {
    setDialogEditMarkerStatus(!dialogEditMarkerStatus)
  }

  const handleOpenCreateDialog = () => {
    setDialogCreateMarkerStatus(true)
  }

  const handleCloseCreateDialog = () => {
    setDialogCreateMarkerStatus(false)
  }

  const { data: markerData, loading, refetch } = useQuery(markers)

  const handleRefetchContent = () => {
    refetch()
    setMarkerContent(initialMarkerState)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading ? (
        <SkeletonManageProjectPage />
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ alignSelf: 'center' }}
            />
            <Button
              variant="contained"
              sx={{ borderRadius: '16px' }}
              onClick={handleOpenCreateDialog}
            >
              <Typography variant="body1" fontWeight={700}>
                {t('title_marker_control_page_button_p1')}
              </Typography>
            </Button>
          </Grid>
          <MarkerList
            markerData={markerData}
            refetch={handleRefetchContent}
            handleOpenPreviewMarker={handleOpenPreviewMarker}
            toggleEditDialog={handleToggleEditDialog}
            markerContent={markerContent}
            setMarkerContent={setMarkerContent}
          />
          <MarkerDialogCreate
            status={dialogCreateMarkerStatus}
            onCloseDialog={handleCloseCreateDialog}
            refetch={handleRefetchContent}
          />
          <MarkerDialogEdit
            status={dialogEditMarkerStatus}
            toggleDialog={handleToggleEditDialog}
            refetch={handleRefetchContent}
            markerContent={markerContent}
            setMarkerContent={setMarkerContent}
          />
          {previewMarkerStatus?.status && (
            <PreviewMarker
              url={previewMarkerStatus?.markerUrl}
              name={previewMarkerStatus?.markerName}
              onClosePreviewMarkerDialog={handleClosePreviewMarker}
              status={previewMarkerStatus?.status}
            />
          )}
        </>
      )}
    </Container>
  )
}
