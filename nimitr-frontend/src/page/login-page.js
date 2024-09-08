import { useMutation } from '@apollo/client'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  Grid,
  Alert,
  Stack,
  Button,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  Divider,
  Snackbar
} from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { NimitrTextField } from '../component/ui/text-field'
import AuthContext from '../contexts/AuthContext'
import loginMutation from '../graphql/mutations/login'
import { yellow } from '@mui/material/colors'

export const LoginPage = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const { user, setToken } = useContext(AuthContext)
  const [errorState, setErrorState] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const [login] = useMutation(loginMutation)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/project')
      }, 100)
    }
  }, [navigate, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({
        variables: { username, password }
      })
      if (data?.login) {
        // const decoded = await jwtDecode(data?.login)
        // const { data: dataProject } = await projectData.refetch({ _id: decoded?.project })
        setToken(data.login)
        // setProject(dataProject)
        navigate('/project')
      }
    } catch (err) {
      console.error(err)
      setErrorState(true)
      setErrorMessage(err?.message)
      handleAlertErrorOpen()
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleAlertErrorOpen = () => {
    setOpenErrorAlert(true)
  }
  // console.log("LOG", open)
  const handleAlertErrorClose = () => {
    setOpenErrorAlert(false)
  }

  // console.log("LOG", open)
  const handleAlertClose = () => {
    setOpenAlert(false)
  }

  return (
    <Grid
      container
      sx={{
        bgcolor: '#FFF4D7',
        height: { lg: '800px', xs: '300px', sm: '500px' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -2,
        backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: '#FFFFFF',
          width: '466px',
          height: '630px',
          zIndex: 2,
          paddingLeft: '50px',
          paddingRight: '50px',
          borderRadius: '10px'
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: '20px' }}
        >
          <Box
            component="img"
            src="/NimitrIcon.png"
            sx={{
              p: 1,
              width: '80px',
              height: '80px',
              borderRadius: '20px'
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: '32px'
            }}
          >
            NIMITR
          </Typography>
        </Stack>
        <Typography
          variant="h5"
          sx={{
            padding: '20px',
            textAlign: 'center'
          }}
        >
          {t('login_page.title_p1')}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700
          }}
        >
          {t('login_page.title_p2')}
        </Typography>
        <NimitrTextField
          error={errorState}
          margin="normal"
          fullWidth
          id="username"
          name="username"
          placeholder={t('login_page.title_p2')}
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrorState(false)
          }}
          autoFocus
          sx={{
            '&.MuiFormControl-root': {
              mt: 0
            }
          }}
        />
        <Grid sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700
            }}
          >
            {t('login_page.title_p3')}
          </Typography>
          <NimitrTextField
            error={errorState}
            margin="normal"
            fullWidth
            name="password"
            placeholder={t('login_page.title_p3')}
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrorState(false)
            }}
            autoComplete="current-password"
            sx={{
              '&.MuiFormControl-root': {
                mt: 0
              }
            }}
          />
        </Grid>
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          sx={{
            my: 3,
            borderRadius: '15px',
            fontWeight: 700,
            height: '46.2px',
            bgcolor: theme.palette.primary.main,
            color: 'black'
          }}
        >
          {t('login_page.title_p4')}
        </Button>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.main,
            textAlign: 'center',
            padding: '20px',
            fontWeight: 400,
            cursor : 'pointer'
          }}
          onClick={() => {
            navigate('/forgot')
          }}
        >
          {t('login_page.title_p5')}
        </Typography>
        <Divider />

        <Typography
          variant="body1"
          sx={{
            mt: '40px',
            textAlign: 'center',
            fontWeight: 400
          }}
        >
          {t('login_page.title_p6')}
          <Button
            variant="text"
            sx={{ p: 0, ml: 1 }}
            onClick={() => {
              navigate('/register')
            }}
          >
            {t('login_page.title_p7')}
          </Button>
        </Typography>
      </Box>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        sx={{
          width: {
            lg: '60%',
            xs: '80%',
            sm: '60%'
          }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
          Create Account Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleAlertErrorClose}
        sx={{
          width: {
            lg: '60%',
            xs: '80%',
            sm: '60%'
          }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}