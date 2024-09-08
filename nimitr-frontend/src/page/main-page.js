import { useQuery } from '@apollo/client'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Container, Grid } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ProjectDialogCreate } from '../component/main-page/project-dialog-create'
import { ProjectList } from '../component/main-page/project-list'
import { SkeletonMainPage } from '../component/main-page/skeleton-main-page'
import AuthContext from '../contexts/AuthContext'
import projectbyUser from '../graphql/queries/projectbyUser'
import userinfo from '../graphql/queries/userinfo'

const initialProjectState = {
  id: '',
  name: ''
}

export const MainPage = () => {
  const { user } = useContext(AuthContext)
  const { t } = useTranslation()
  const [dialogCreateProjectStatus, setDialogCreateProjectStatus] =
    useState(false)

  const [projectState, setProjectState] = useState(initialProjectState)
  const handleOpenCreateDialog = () => {
    setDialogCreateProjectStatus(true)
  }

  const handleCloseCreateDialog = () => {
    setDialogCreateProjectStatus(false)
  }

  const [quser, setQuser] = useState(null)
  const { data } = useQuery(userinfo, {
    variables: {
      id: user && user._id ? user._id : 'default_id'
    }
  })

  useEffect(() => {
    if (data && data.userId && data.userId.rank) {
      setQuser(data.userId)
    }
  }, [data])

  const {
    data: projectData,
    loading,
    refetch
  } = useQuery(projectbyUser, {
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        user: user?._id,
        OR: [
          {
            projectStatus: 'PROJECT_ALIVE'
          },
          {
            projectStatus: 'PROJECT_LOCK'
          }
        ]
      }
    }
  })

  const refetchData = () => {
    refetch({
      filter: {
        user: user?._id,
        OR: [
          {
            projectStatus: 'PROJECT_ALIVE'
          },
          {
            projectStatus: 'PROJECT_LOCK'
          }
        ]
      }
    })
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading ? (
        <SkeletonMainPage />
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
            >
              {/* {pathMainpage?.map((data) => (
            <Link
              color={theme.palette.primary.black}
              underline="hover"
              onClick={() => {
                handleChangePageState(data);
              }}
            >
              {data}
            </Link>
          ))} */}
            </Breadcrumbs>
          </Grid>
          <ProjectList
            project={projectData}
            refetch={refetchData}
            handleOpenCreateDialog={handleOpenCreateDialog}
          />
          <ProjectDialogCreate
            status={dialogCreateProjectStatus}
            onCloseDialog={handleCloseCreateDialog}
            refetch={refetchData}
            user={user}
            quser={quser}
            projectState={projectState}
            setProjectState={setProjectState}
          />
        </>
      )}
    </Container>
  )
}
