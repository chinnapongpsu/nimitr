import { useMutation } from '@apollo/client'
import axios from 'axios'
import { Close, QrCode, Upload } from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import {
  Button,
  Typography,
  IconButton,
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  FormControl,
  Grid
} from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import CreateProjectMutation from '../../graphql/mutations/createProject'
import { NimitrTextField } from '../ui/text-field'

import CustomBackdrop from '../ui/BackdropProgress'

const initialProjectState = {
  id: '',
  name: '',
  type: 'barcode'
}

const URL_GENERAT_QR = process.env.REACT_APP_GENERAT_QR
const DOMAIN = process.env.REACT_APP_DOMAIN

export const ProjectDialogCreate = ({
  status,
  onCloseDialog,
  refetch,
  user,
  setProjectState,
  projectState
}) => {
  const [createProjectMutation] = useMutation(CreateProjectMutation)

  const [selectedOption, setSelectedOption] = useState('barcode')

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateProject = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/project', {
        id: user?._id, 
      });
      const { data: responseCreateProject } = await createProjectMutation({
        variables: {
          user: user?._id,
          name: projectState?.name,
          type: selectedOption
        }
      })
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
    handleRefresh()
  }

  const handleRefresh = () => {
    setProjectState(initialProjectState)
    refetch()
    onCloseDialog()
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
      maxWidth="lg"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ fontWeight: 900 }}>
          {t('project_dialog_create_edit.title_head')}
        </Typography>
        <IconButton onClick={handleRefresh}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleCreateProject}>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <Stack>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              placeholder={t('project_dialog_create_edit.title_p1')}
              value={projectState?.name}
              onChange={(e) => {
                setProjectState({ ...projectState, name: e.target.value })
              }}
              sx={{
                '& .MuiFormControl-root': {
                  mt: 0,
                  width: '50vw',
                  p: 1
                }
              }}
            />
            <FormControl>
              <NimitrTextField
                margin="normal"
                required
                fullWidth
                id="outlined-select-currency"
                select
                size="small"
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value)
                }}
              >
                {/* <MenuItem value="image">
                  <Grid container alignItems="center">
                    <Grid item>
                      <ImageIcon />
                    </Grid>
                    <Grid item>
                      <Typography>Image</Typography>
                    </Grid>
                  </Grid>
                </MenuItem> */}

                <MenuItem value="barcode">
                  <Grid container alignItems="center">
                    <Grid item>
                      <QrCode />
                    </Grid>
                    <Grid item>
                      <Typography>Barcode</Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              </NimitrTextField>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontWeight: 700 }}
            disabled={!projectState?.name || isLoading}
          >
            {t('project_dialog_create_edit.title_submit')} <Upload />
          </Button>
        </DialogActions>
        <CustomBackdrop open={isLoading} />
      </Box>
    </Dialog>
  )
}

ProjectDialogCreate.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    rank: PropTypes.string
  }),
  quser: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    rank: PropTypes.string
  }),
  setProjectState: PropTypes.func.isRequired,
  projectState: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
}

ProjectDialogCreate.defaultProps = {
  status: false,
  onCloseDialog: () => {},
  refetch: () => {},
  user: {},
  quser: {},
  projectState: {}
}
