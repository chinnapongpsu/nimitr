import { useMutation } from "@apollo/client";
import {
  Box,
  Grid,
  Alert,
  Stack,
  Button,
  Typography,
  useTheme,
  Divider,
  Snackbar,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoginDialog } from "../component/login-dialog";
import CustomBackdrop from "../component/ui/BackdropProgress";
import { NimitrTextField } from "../component/ui/text-field";
import AuthContext from "../contexts/AuthContext";
import RegisterMember from "../graphql/mutations/register";
import SetPassword from "../graphql/mutations/setPassword";

export const RegisterPage = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };
  const theme = useTheme();
  const { t } = useTranslation();

  const [registerMember] = useMutation(RegisterMember);
  const [setPasswordMember] = useMutation(SetPassword);

  const navigate = useNavigate();
  const { user, setToken } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/project");
      }, 100);
    }
  }, [navigate, user]);
  const handleAlertErrorOpen = () => {
    setOpenErrorAlert(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: responseCreateMember } = await registerMember({
        variables: {
          username,
          firstname,
          lastname,
          role: "ADMIN",
          rank: "ADMIN",
          mobile: phoneNumber,
          email,
        },
      });
      // console.log("MEMBER", responseCreateMember?.createMemberUser?.recordId)
      if (responseCreateMember) {
        const { data: responseSetPasswordMember } = await setPasswordMember({
          variables: {
            _id: responseCreateMember?.createMemberUser?.recordId,
            password,
          },
        });
        // console.log("MEMBER2", responseSetPasswordMember)
        if (responseSetPasswordMember) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
      handleAlertErrorOpen(true);
    }
    setIsLoading(false);
  };
  // console.log("LOG", open)
  const handleAlertErrorClose = () => {
    setOpenErrorAlert(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={0}
        md={0}
        lg={8}
      >
        <Box
          sx={{
            background: "rgba(255, 218, 83, 0.8)",
            height: { lg: "100%", xs: "300px", sm: "500px" },
            width: "100%",
            backgroundSize: { lg: "cover", xs: "contain", sm: "contain" },
            backgroundRepeat: "no-repeat",
            padding: "80px",
            zIndex: -1,
            textAlign: "-webkit-center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: { lg: "214px", xs: "100px", sm: "150px" },
              width: "425px",
              bgcolor: "#FFFFE8",
              zIndex: -1,

              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              borderRadius: "15px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box
                component="img"
                src="/NimitrIcon.png"
                sx={{
                  p: 1,
                  width: "162px",
                  height: "162px",
                  borderRadius: "20px",
                }}
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontSize: "50px",
              }}
            >
              NIMITR
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          zIndex: 1,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "#FFFFFF",
            width: { xs: "100%", lg: "466px" },
            height: "100%",
            zIndex: 2,
            paddingTop: "20px",
            paddingRight: "60px",
            paddingLeft: "60px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: "20px" }}
          >
            <Box
              component="img"
              src="/NimitrIcon.png"
              sx={{
                p: 1,
                width: "80px",
                height: "80px",
                borderRadius: "20px",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: "32px",
              }}
            >
              NIMITR
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            {t("login_page.title_p7")}
          </Typography>
          <Grid>
            <Typography variant="caption">
              {t("login_page.title_p2")}
            </Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              placeholder={t("login_page.title_p2")}
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoFocus
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="caption">
              {t("login_page.title_p3")}
            </Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder={t("login_page.title_p3")}
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
          </Grid>
          <Divider sx={{ mt: 2 }} />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Grid>
              <Typography variant="caption">
                {t("login_page.title_p8")}
              </Typography>
              <NimitrTextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                name="firstname"
                placeholder={t("login_page.title_p8")}
                autoComplete="firstname"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                autoFocus
                sx={{
                  "&.MuiFormControl-root": {
                    mt: 0,
                  },
                }}
              />
            </Grid>
            <Grid>
              <Typography variant="caption">
                {t("login_page.title_p9")}
              </Typography>
              <NimitrTextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                name="lastname"
                placeholder={t("login_page.title_p9")}
                autoComplete="lastname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                autoFocus
                sx={{
                  "&.MuiFormControl-root": {
                    mt: 0,
                  },
                }}
              />
            </Grid>
          </Stack>

          <Grid>
            <Typography variant="caption">
              {t("login_page.title_p10")}
            </Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              placeholder={t("login_page.title_p10")}
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="caption">
              {t("login_page.title_p11")}
            </Typography>
            <NimitrTextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              placeholder={t("login_page.title_p11")}
              type="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              autoComplete="current-password"
              sx={{
                "&.MuiFormControl-root": {
                  mt: 0,
                },
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="subtitle2">
              By continuing, you agree to our &nbsp;
              <a
                href="https://nimitr.art/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Privacy Policy
              </a>
            </Typography>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "15px",
              fontWeight: 700,
              height: "46.2px",
              bgcolor: theme.palette.primary.main,
              color: "black",
              mt: 5,
              my: 3,
            }}
          >
            {t("login_page.title_p7")}
          </Button>
          <Divider sx={{ mt: 5 }} />

          <Typography
            variant="body1"
            sx={{
              mt: "40px",
              textAlign: "center",
              fontWeight: 400,
              my: 5,
            }}
          >
            {t("login_page.title_p12")}
            <Button
              variant="text"
              onClick={handleOpenLoginDialog}
              sx={{ p: 0, ml: 1 }}
            >
              {t("login_page.title_p1")}
            </Button>
          </Typography>
          <CustomBackdrop open={isLoading} />
        </Box>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        sx={{
          width: {
            lg: "60%",
            xs: "80%",
            sm: "60%",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Create Account Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleAlertErrorClose}
        sx={{
          width: {
            lg: "60%",
            xs: "80%",
            sm: "60%",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleCloseLoginDialog}
        user={user}
        setToken={setToken}
      />
    </Grid>
  );
};
