import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Close, ModeEditOutline } from '@mui/icons-material'
import {
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import UpdateProjectMutation from '../../graphql/mutations/updateProject'
import { NimitrTextField } from '../ui/text-field'

import CustomBackdrop from '../ui/BackdropProgress'

const ProjectDialogEdit = ({
  status,
  onCloseDialog,
  refetch,
  projectState,
  setProjectState
}) => {
  const { t } = useTranslation()
  const [updateProjectMutation] = useMutation(UpdateProjectMutation)

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProject = async (e) => {
    e.preventDefault()
    // console.log("NAME", projectCreateState)
    setIsLoading(true)
    try {
      await updateProjectMutation({
        variables: {
          id: projectState?.id,
          name: projectState?.name
        }
      })
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
    handleRefresh()
  }

  const handleRefresh = () => {
    refetch()
    onCloseDialog()
  }

  const handleChangeStateValue = (e) => {
    setProjectState({ ...projectState, [e.target.name]: e.target.value })
  }

  return (
    <Dialog
      PaperProps={{
        sx: {
          p: 1
        }
      }}
      open={status}
      keepMounted
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItem: 'center'
        }}
      >
        <Typography
          sx={{ justifyItems: 'center', alignSelf: 'center', fontWeight: 900 }}
        >
          {t('project_dialog_create_edit.title_head')}
        </Typography>
        <IconButton onClick={handleRefresh}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleUpdateProject}>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <NimitrTextField
            margin="normal"
            required
            id="name"
            name="name"
            fullWidth
            placeholder={t('project_dialog_create_edit.title_p1')}
            value={projectState?.name}
            onChange={handleChangeStateValue}
            sx={{
              '&.MuiFormControl-root': {
                mt: 0,
                width: '400px'
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontWeight: 700 }}
            disabled={!projectState?.name || isLoading}
          >
            {t('project_dialog_create_edit.title_update')} <ModeEditOutline />
          </Button>
        </DialogActions>
        <CustomBackdrop open={isLoading} />
      </form>
    </Dialog>
  )
}
ProjectDialogEdit.defaultProps = {
  status: false,
  onCloseDialog: () => {},
  refetch: () => {},
  setProjectState: () => {},
  projectState: {}
}
ProjectDialogEdit.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
  setProjectState: PropTypes.func,
  projectState: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
    // Add more PropTypes for other properties if needed
  })
}

export default ProjectDialogEdit
