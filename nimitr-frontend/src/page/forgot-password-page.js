import { Box, Button, Grid, TextField, Typography, Stack, useTheme,Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState,useContext,useEffect } from "react";
import resetPasswordMutation from '../graphql/mutations/resetPassword'
import { useMutation } from "@apollo/client";
import { NimitrTextField } from '../component/ui/text-field'


export const ForgotPasswordPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { t } = useTranslation();

    const [email, setEmail] = useState()
    const [errorState, setErrorState] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

   
    const handleSubmit = async (e) => {
        //console.log('click');
        handleClick();
        e.preventDefault()
        try {
          const { data } = await resetPassword({
            variables: { email }
          })
          setOpenSuccess(true);
          setTimeout(() => {
            setOpenSuccess(true);
            navigate('/check');
          }, 1500); 
        } 
          catch (err) {
          console.error(err)
          setErrorState(true)
          setErrorMessage(err?.message)
          handleAlertErrorOpen()
          setDisabled(false);
        }
        }

    const [resetPassword] =useMutation(resetPasswordMutation)
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
                component= "form"
                onSubmit={handleSubmit}
                sx={{
                    bgcolor: '#FFFFFF',
                    padding: '30px',
                    textAlign: 'center',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    boxShadow: '0 0 108px rgba(0, 0, 0, 0.1)',
                    height: '400px',
                    width: '900px',
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
                    alt="nimitr-webar"
                    component="img"
                    src="/title.gif"
                    sx={{
                        width: { lg: '450px', md: '400px', sm: '400px', xs: '100%' },
                        height: { lg: '250px', md: '300px', sm: '300px', xs: 'px' },
                        margin: '5px'
                    }}
                >
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ py: 2, fontWeight: 700, mb: '30px' }} >{t('forgot_password.title_p1')}</Typography>
                    <NimitrTextField
                        error={errorState}
                        margin="normal"
                        fullWidth
                        name="email"
                        placeholder={t('forgot_password.title_p3')}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorState(false)
                            }}
                        sx={{
                            width: '300px', mb: '20px',
                        }}
                        helperText={t('forgot_password.title_p2')}
                    />
                    <Button
                    type="submit" 
                    variant="contained" 
                    disabled={disabled}
                    sx={{ width: '200px', my: '30px', py: '10px', 
                    fontWeight: 700 
                    }}>
                    {t('forgot_password.title_p4')}
                    </Button>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "center",
                            fontWeight: 100,
                        }}
                    >
                        {t("login_page.title_p12")}
                        <Button
                            variant="text"
                            sx={{ p: 0, ml: 1 }}
                            onClick={() => {navigate('/chack')}}
                        >
                            {t("login_page.title_p1")}

                        </Button>
                    </Typography>
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
      {t("forgot_password.title_p5")}
      </Alert>
      </Snackbar>
    </Grid>

    );
};