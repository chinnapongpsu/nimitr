import { Refresh } from '@mui/icons-material'
import { useState } from 'react'
import { Button, CircularProgress, Tooltip, Backdrop } from '@mui/material'

const BackdropCircle = ({t, refetch }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const handleOpen = () => {
    setOpenBackdrop(true)
  }

  const handleClose = () => {
    setOpenBackdrop(false)
  }

  const handleRefetch = async () => {
    // Open the Backdrop when refetching starts
    handleOpen()
    try {
      await refetch()
    } catch (error) {
    } finally {
      handleClose()
    }
  }
  return (
    <>
      <Tooltip title={t('checkTranscript_page.title_p11')}>
        <Button
          variant="contained"
          sx={{ fontWeight: 700 }}
          onClick={handleRefetch}
        >
          <Refresh />
        </Button>
      </Tooltip>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
export default BackdropCircle
