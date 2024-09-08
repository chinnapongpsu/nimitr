import { Box, Button, Grid, TextField, Typography, Stack, InputLabel,Snackbar,Alert,FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/client";
import setPasswordMutation from '../graphql/mutations/setPassword'
import { NimitrTextField } from '../component/ui/text-field'
import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";



export const ChangePassword = () => {
  const { t } = useTranslation();
  const [setPasswordMember] = useMutation(setPasswordMutation);
  const [password, setPassword] = useState();
  const [confirm_password,setConfirm] = useState();
  const [errorState, setErrorState] = useState(false)
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate()

  const params = useParams()
  const decoded = jwtDecode(params?.token)

  const [openAlert, setOpenAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (password !== confirm_password) {
      //console.log('password not match!')
      setOpenSnackbar(true);
      return;
    }
    try {
      const { data } = await setPasswordMember({
          variables: 
          {
              _id: params?.id,
              password
          },
      })
          handleClick();
          //console.log('finally')
          setOpenSuccess(true);
          setTimeout(()=> {
            navigate('/');
           }, 2000);

  } catch (err) {
         console.error(err)
         setErrorState(true)
         setErrorMessage(err?.message)
         handleAlertErrorOpen()
         setDisabled(false);
      }
    }
  const handleAlertErrorOpen = () => {
    setOpenErrorAlert(true)
  }
  const handleAlertErrorClose = () => {
    setOpenErrorAlert(false)
  }
  const handleAlertClose = () => {
    setOpenAlert(false)
  }
  const handleClick = () => {
    setDisabled(true);
  };

  if (!(decoded?.exp > Math.round(new Date().getTime() / 1000))) {
    return (
      <Grid container
            sx={{
                // bgcolor: '#FFFFFF',
                height: { lg: '600px', xs: '300px', sm: '500px' },
                pb: '70px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: -2,
                backgroundSize: { lg: 'cover', xs: 'contain', sm: 'contain' },
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Box
                sx={{
                    bgcolor: '#FFFFFF',
                    padding: '30px',
                    textAlign: 'center',
                    borderRadius: '20px',
                    display: 'flex',
                    height: '400px',
                    width: '1100px',
                    flexDirection: { xs: 'column', md: 'row' },
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    borderRadius: '10px'
                }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ padding: '20px' }}
                ></Stack>
                <Box
                    component="img"
                    src="/change_prop.gif"
                    sx={{
                        width: { lg: '480px', md: '480px', sm: '400px', xs: '100%' },
                        height: { lg: '450px', md: '450px', sm: '350', xs: '100%' },
                        margin: '10px'

                    }}
                >
                </Box>

                <Box sx={{  display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'}}
                            >
                    <Typography variant="h4" sx={{ py: 2, fontWeight: 700, mb: '10px', mt: '40px' }} >{t('Change_password.title_p9')}</Typography>
                    <Typography variant="subtitle2" sx={{ mb: '10px', textAlign: 'center',width: {lg: '400px', md: '400px', sm: '350px', xs: '100%'} }} >
                    {t('Change_password.title_p10')}
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '200px', my: '30px', py: '10px',
                            fontWeight: 700,
                            }}
                        onClick={() => {navigate('/login')}}>
                        {t('Change_password.title_p11')}
                    </Button>
                </Box>

            </Box>
        </Grid>
    )
  }
  //console.log(decoded, 1637833438 > Math.round(new Date().getTime() / 1000));
  return (
    <Grid container
      sx={{
        bgcolor: '#FFF4D7',
        height: { lg: '700px', xs: '300px', sm: '500px' },
        pb: '70px',
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
        onSubmit={handleResetPassword}
        sx={{
          bgcolor: '#FFFFFF',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          boxShadow: '0 0 108px rgba(0, 0, 0, 0.1)',
          height: {lg:'450px', xs: '100vh', sm: '450px'},
          width: '400px',
          paddingLeft: '50px',
          paddingRight: '50px',
          mb: '70px',
          pt: {lg: '20px', xs: '100px', sm: '0px'},
          borderRadius: '10px',
        }}>
        <Box>
          <Typography variant="h5" sx={{ py: 2, fontWeight: 700, mb: '10px' ,}} >{t('Change_password.title_p1')}</Typography>
          <Typography variant="subtitle2" sx={{ bgcolor: '#fff8ba' ,p:'10px',mb: '20px',borderRadius: '5px' }} >{t('Change_password.title_p2')} <br/> {t('Change_password.title_p3')}</Typography>
          <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder={t("Change_password.title_p4")}
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
                    />     
               <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              placeholder={t("Change_password.title_p5")}
              type="password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              autoComplete="current-password"
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
              />
         <Button 
          type="submit" 
          variant="contained"
          disabled={disabled}
          sx={{ width: '300px', my: '20px', py: '10px', fontWeight: 700 }}>{t('Change_password.title_p6')}</Button>
        </Box>
      </Box>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
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
      <Alert onClose={() => setOpenSnackbar(false)} variant="filled" severity="error" sx={{ width: '100%' }}>
      {t("Change_password.title_p7")}
      </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
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
      <Alert onClose={() => setOpenSuccess(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
      {t("Change_password.title_p8")}
      </Alert>
      </Snackbar>
    </Grid>
  );
};
