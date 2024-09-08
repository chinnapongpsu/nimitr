import { useMutation, useQuery } from '@apollo/client'
import {
  ModeEditOutline,
  DeleteOutline,
  FolderOpen,
  QrCode,
  PanToolAlt
} from '@mui/icons-material'
import ImageIcon from '@mui/icons-material/Image'
import {
  Tooltip,
  Box,
  IconButton,
  List,
  Paper,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'
import RemoveProjectMutation from '../../graphql/mutations/removeProject'
import userinfo from '../../graphql/queries/userinfo'

import ProjectDialogEdit from './project-dialog-edit'
import CustomBackdrop from '../ui/BackdropProgress'

const initialProjectState = {
  id: null, // Change to null to represent no ID initially
  name: '',
  type: ' '
}

export const ProjectList = ({
  project: projectProp,
  refetch,
  handleOpenCreateDialog
}) => {
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [projectState, setProjectState] = useState(initialProjectState)
  const [dialogEditProjectStatus, setDialogEditProjectStatus] = useState(false)
  const [removeProjectMutation] = useMutation(RemoveProjectMutation)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [quser, setQuser] = useState(null)
  const { data } = useQuery(userinfo, {
    fetchPolicy: 'network-only',
    variables: {
      id: user && user._id ? user._id : 'default_id'
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data && data.userId && data.userId.rank) {
      setQuser(data.userId)
    }
  }, [data])

  const handleRemoveProject = (projectId) => async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data: responseRemoveProject } = await removeProjectMutation({
        variables: {
          id: projectId,
          record: {
            projectStatus: 'PROJECT_DELETE'
          }
        }
      })
      if (responseRemoveProject) {
        handleRefresh()
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const handleRefresh = () => {
    refetch()
    handleCloseRemoveDialog()
  }

  const handleOpenEditDialog = (project) => {
    setProjectState({ ...projectState, name: project?.name, id: project?._id })
    setDialogEditProjectStatus(true)
  }

  const handleCloseEditDialog = () => {
    setDialogEditProjectStatus(false)
  }

  const handleOpenRemoveDialog = (projectId, projectName) => {
    setProjectState({ ...projectState, id: projectId, name: projectName })
    setDialogOpen(true)
  }

  const handleCloseRemoveDialog = () => {
    setDialogOpen(false)
  }

  const handleNavigation = () => {
    // เรียกใช้ฟังก์ชัน navigate เพื่อนำทางไปยังหน้าอื่น
    navigate(`/payment/${user?._id}`)
  }

  const handleNavigationToRecommend = () => {
    // เรียกใช้ฟังก์ชัน navigate เพื่อนำทางไปยังหน้าอื่น
    navigate('/recommend')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
      >
        {projectProp?.projects?.length >= quser?.maxprojects ? (
          <>
            <Button
              disabled={true}
              variant="contained"
              sx={{ borderRadius: '16px' }}
              onClick={handleOpenCreateDialog}
            >
              <Typography variant="body1" fontWeight={700}>
                {t('main_page.title_buttoncreate')}
              </Typography>
            </Button>
            <Typography variant="text" sx={{ color: 'red', fontSize: '14px' }}>
              {t('project_list.title_p4')}
              <span
                onClick={handleNavigation}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 700
                }}
              >
                {t('project_list.title_p5')}
              </span>
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ borderRadius: '16px' }}
            onClick={handleOpenCreateDialog}
          >
            <Typography variant="body1" fontWeight={700}>
              {t('main_page.title_buttoncreate')}
            </Typography>
          </Button>
        )}
      </Box>

      {!projectProp?.projects?.length ? (
        <Paper
          elevation={3}
          sx={{
            mt: 5,
            bgcolor: theme?.palette?.primary?.main,
            width: '100%',
            height: { xs: '250px', sm: '450px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            flexDirection: 'column'
          }}
        >
          <Typography
            fontWeight={700}
            sx={{ textAlign: 'center', fontSize: { xs: '24px', sm: '48px' } }}
          >
            {t('project_list.title_p1')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={handleNavigationToRecommend}
              fontWeight={700}
              sx={{
                color: 'black',
                backgroundColor: 'white',
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '16px', sm: '32px' },
                borderRadius: 10,
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)',
                  transition: 'background-color 0.3s, transform 0.3s'
                }
              }}
            >
              <PanToolAlt sx={{ fontSize: { xs: '22px', sm: '36px' } }} />
              {t('headtext_compo.title_p1')}
            </Button>
          </Box>
        </Paper>
      ) : (
        <List>
          {projectProp?.projects?.map((project, index) => (
            <>
              <Grid item key={project?._id} xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    my: 2,
                    backgroundColor: theme?.palette?.primary?.lightGray,
                    borderRadius: '16px',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Tooltip title={t('project_list.title_open')}>
                    <Button
                      variant="contained"
                      sx={{
                        width: '100%',
                        justifyContent: 'start'
                      }}
                      onClick={() => {
                        navigate(`/project/${project?._id}`)
                      }}
                      disabled={project?.projectStatus === 'PROJECT_LOCK'}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          ml: 2,
                          mt: 1,
                          mb: 1,
                          marginRight: 'auto',
                          textAlign: 'left'
                        }}
                      >
                        {index + 1}. {project?.name}
                      </Typography>
                      {project?.type === 'image' ? <ImageIcon /> : <QrCode />}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mr: 2,
                          mt: 1,
                          mb: 1
                        }}
                      >
                        {project?.type}
                      </Typography>
                    </Button>
                  </Tooltip>

                  <Box
                    sx={{
                      p: 2,
                      mt: 'auto',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Tooltip title={t('project_list.title_open')}>
                        <IconButton
                          variant="contained"
                          sx={{
                            width: '100%',
                            borderRadius: '16px',
                            boxShadow: 5,
                            alignSelf: 'flex-start'
                          }}
                          onClick={() => {
                            navigate(`/project/${project?._id}`)
                          }}
                          disabled={project?.projectStatus === 'PROJECT_LOCK'}
                        >
                          <FolderOpen />
                          <Typography variant="contained" fontWeight={700}>
                            : {t('project_list.title_open')}
                          </Typography>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-end' }}>
                      <Tooltip title={t('project_list.title_edit')}>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.primary.lightGray,
                            boxShadow: 5,
                            m: 1,
                            alignSelf: 'flex-start'
                          }}
                          onClick={() => handleOpenEditDialog(project)}
                          disabled={project?.projectStatus === 'PROJECT_LOCK'}
                        >
                          <ModeEditOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('project_list.title_remove')}>
                        <IconButton
                          sx={{
                            boxShadow: 5,
                            m: 1,
                            alignSelf: 'flex-start',
                            backgroundColor: 'red',
                            color: '#FFFFFF'
                          }}
                          onClick={() =>
                            handleOpenRemoveDialog(project?._id, project?.name)
                          }
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </>
          ))}
          <ProjectDialogEdit
            status={dialogEditProjectStatus}
            onCloseDialog={handleCloseEditDialog}
            refetch={refetch}
            projectState={projectState}
            setProjectState={setProjectState}
          />
        </List>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseRemoveDialog}>
        <DialogTitle>{t('project_list.title_p2')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('project_list.title_p3')}
            {projectState.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog}>
            {t('project_list.title_cancel')}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.lightGray,
              background: 'red',
              color: 'white'
            }}
            onClick={handleRemoveProject(projectState.id)}
            autoFocus
          >
            {t('project_list.title_remove')}
          </Button>
        </DialogActions>
        <CustomBackdrop open={isLoading} />
      </Dialog>
    </>
  )
}
ProjectList.defaultProps = {
  project: null
}

ProjectList.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        projects: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string
          })
        )
      })
    )
  }),
  refetch: PropTypes.func.isRequired
}
