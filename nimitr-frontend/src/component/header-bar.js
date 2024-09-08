import { useQuery } from "@apollo/client";
import {
  LogoutSharp,
  Panorama,
  Article,
  ExpandMore,
  MenuOutlined,
  Backpack,
  Description,
  AccountCircle,
  Recommend,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  Zoom,
  Container,
  Drawer,
  Divider,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/th"; // ถ้าคุณต้องการใช้ภาษาไทย
import timezone from "dayjs/plugin/timezone"; // เพิ่มปลั๊กอิน timezone
import utc from "dayjs/plugin/utc"; // เพิ่มปลั๊กอิน utc
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useApp } from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import userinfo from "../graphql/queries/userinfo";

import { LoginDialog } from "./login-dialog";
import LanguageSelector from "./ui/headerBar/switchLang";
export const HeaderBar = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { user, setToken, removeToken } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang, switchLang } = useApp();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [quser, setQuser] = useState(null);
  const { data } = useQuery(userinfo, {
    fetchPolicy: "network-only",
    variables: {
      id: user && user._id ? user._id : "default_id",
    },
  });

  useEffect(() => {
    if (data && data.userId && data.userId.rank) {
      setQuser(data.userId);
    }
  }, [data]);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const logout = async () => {
    // setProject(null)
    // await setLogout({ variables: { _id: user?._id } })
    removeToken();
    // history.push('/:projectCode/login')
    navigate("/");
  };
  // console.log(user);
  const getButtonStyles = (theme) => ({
    fontWeight: 700,
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.black,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      transition: "background-color 0.5s ease",
    },
    letterSpacing: "1px",
    borderRadius: "10px",
    display: {
      xs: "none",
      sm: "none",
      md: "block",
    },
  });
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isSmallScreenOnClick = useMediaQuery("(max-width: 899px)");
  const drawerWidth = isSmallScreen ? "70%" : "35%"; // Adjust the width values as needed

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: theme.palette.primary.white,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              variant="text"
              onClick={() => {
                navigate("/");
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "45px",
                  height: "45px",
                  borderRadius: "10px",
                }}
                component="img"
                src="/NimitrIcon.png"
              />
            </IconButton>

            {/* {user?.rank === 'ADMIN' && (
              <Button
                onClick={() => {
                  navigate('/control/marker')
                }}
                sx={getButtonStyles(theme)}
              >
                {t('manage-project-page.title_markers')}
              </Button>
            )} */}

            {user ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/project");
                  }}
                  sx={getButtonStyles(theme)}
                >
                  {t("manage-project-page.title_my_project")}
                </Button>
                {/* <Button
                  onClick={() => {
                    navigate(`/payment/${user?._id}`);
                    handleCloseUserMenu();
                  }}
                  sx={getButtonStyles(theme)}
                >
                  {t("payment_page.title_p1")}
                </Button> */}
                <Button
                  onClick={() => {
                    navigate("/recommend");
                    handleCloseUserMenu();
                  }}
                  sx={getButtonStyles(theme)}
                >
                  {t("goodimageAr_compo.title_p13")}
                </Button>
                <Button
                  sx={{
                    fontWeight: 700,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                    },
                  }}
                  disableElevation
                  size="small"
                  aria-label="Language Selector"
                >
                  <LanguageSelector lang={lang} switchLang={switchLang} />
                </Button>
              </>
            ) : null}

            {!user ? (
              <>
                <Box
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    justifyContent: "flex-end",
                  }}
                >
                  <LanguageSelector lang={lang} switchLang={switchLang} />
                  <Button
                    variant="text"
                    sx={{
                      flexGrow: 1,
                      mr: 2,
                      borderRadius: "10px",
                      color: theme.palette.primary.black,
                      border: "1px solid #FFD102",
                      fontWeight: 700,
                    }}
                    onClick={handleOpenLoginDialog}
                  >
                    {t("title_login")}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      flexGrow: 1,
                      fontWeight: 400,
                      borderRadius: "10px",
                      bgcolor: "#FFDA53",
                      color: theme.palette.primary.black,
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    {t("title_subscribe")}
                  </Button>
                </Box>
                <Tooltip title="Open settings">
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 1,
                      borderRadius: "5px",
                      display: {
                        xs: "block",
                        sm: "block",
                        md: "none",
                      },
                    }}
                  >
                    {anchorElUser ? (
                      <Zoom in>
                        <ExpandMore />
                      </Zoom>
                    ) : (
                      <MenuOutlined />
                    )}
                  </IconButton>
                </Tooltip>

                <Drawer
                  anchor="right"
                  open={isDrawerOpen}
                  onClose={handleCloseDrawer}
                  PaperProps={{
                    style: {
                      width: drawerWidth,
                    },
                  }}
                >
                  <MenuItem sx={{ p: 2 }}>
                    <Button
                      variant="text"
                      onClick={() => {
                        handleOpenLoginDialog();
                        handleCloseDrawer();
                      }}
                      sx={{
                        flexGrow: 1,
                        borderRadius: "10px",
                        color: theme.palette.primary.black,
                        border: "1px solid #FFD102",
                        fontWeight: 700,
                      }}
                    >
                      {t("title_login")}
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ p: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate("/register");
                        handleCloseDrawer();
                      }}
                      sx={{
                        flexGrow: 1,
                        fontWeight: 400,
                        borderRadius: "10px",
                        bgcolor: "#FFDA53",
                        color: theme.palette.primary.black,
                        fontWeight: 700,
                      }}
                    >
                      {t("title_subscribe")}
                    </Button>
                  </MenuItem>
                  <Divider variant="middle" sx={{ color: "#000000" }} />
                  <MenuItem>
                    <LanguageSelector lang={lang} switchLang={switchLang} />
                  </MenuItem>
                  <Divider variant="middle" sx={{ color: "#000000" }} />
                </Drawer>
              </>
            ) : (
              // End !user //
              <Box sx={{ flexGrow: 0 }}>
                <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
                  <Tooltip>
                    <Button
                      onClick={!isSmallScreenOnClick ? handleOpenProfileMenu : null}
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: theme.palette.primary.black,
                      }}
                    >
                      <AccountCircle sx={{ fontSize: "36px" }} />
                      {`${user.firstname} ${user.lastname} `}
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "39px",
                      display: { xs: "none", sm: "none", md: "block" },
                    }}
                    anchorEl={anchorElProfile}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElProfile)}
                    onClose={handleCloseProfileMenu}
                  >
                    {/* <MenuItem>
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={'center'}
                      >
                        <Typography
                          textAlign="center"
                          onClick={() => {
                            navigate(`/payment/${user?._id}`)
                            handleCloseProfileMenu()
                          }}
                        >
                          <span style={{ fontWeight: 700 }}>
                            {t('payment_page.title_p1')} :
                          </span>
                          {quser?.rank === 'NOMAL' ? ' FREE' : quser?.rank}
                        </Typography>
                      </Stack>
                    </MenuItem> */}
                    {/* {quser?.userExpirationTime ? (
                      <MenuItem>
                        <Stack direction="row" spacing={2}>
                          <Typography textAlign="center">
                            <span style={{ fontWeight: 700 }}>
                              {t('payment_page.title_p3')} :
                            </span>
                            {dayjs(quser.userExpirationTime)
                              .tz('Asia/Bangkok')
                              .format('DD-MM-YYYY HH:mm')}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ) : null} */}

                    {/* <Divider variant="middle" sx={{ color: '#000000' }} /> */}
                    {/* <MenuItem
                      onClick={() => {
                        navigate(`/payment/checking/${user?._id}`)
                        handleCloseProfileMenu()
                      }}
                      sx={{ p: 2 }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Description />
                        <Typography textAlign="center">
                          {t('payment_page.title_p2')}
                        </Typography>
                      </Stack>
                    </MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleCloseProfileMenu();
                      }}
                      sx={{ p: 2 }}
                    >
                      <Stack direction="row" spacing={2}>
                        <LogoutSharp />
                        <Typography textAlign="center">{t("manage-project-page.title_logout")}</Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                  <Tooltip title="Open settings">
                    <IconButton
                      size="large"
                      edge="end"
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 1,
                        borderRadius: "5px",
                        display: {
                          xs: "block",
                          sm: "block",
                          md: "none",
                        },
                      }}
                    >
                      {anchorElUser ? (
                        <Zoom in>
                          <ExpandMore />
                        </Zoom>
                      ) : (
                        <MenuOutlined />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>

                {/* Burger */}
                <Drawer
                  anchor="right"
                  open={isDrawerOpen}
                  onClose={handleCloseDrawer}
                  PaperProps={{
                    style: {
                      width: drawerWidth,
                    },
                  }}
                >
                  {/* <Stack direction="row" spacing={2} justifyContent={'center'}>
                    <Typography textAlign="center" sx={{ mt: 2 }}>
                      <span style={{ fontWeight: 700 }}>
                        {t('payment_page.title_p1')} :
                      </span>
                      {quser?.rank === 'NOMAL' ? ' FREE' : quser?.rank}
                    </Typography>
                  </Stack> */}

                  {/* {quser?.userExpirationTime ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent={'center'}
                    >
                      <Typography textAlign="center">
                        <span style={{ fontWeight: 700 }}>
                          {t('payment_page.title_p3')} :
                        </span>
                        {dayjs(quser.userExpirationTime)
                          .tz('Asia/Bangkok')
                          .format('DD-MM-YYYY HH:mm')}
                      </Typography>
                    </Stack>
                  ) : null} */}

                  <Divider variant="middle" sx={{ color: "#000000" }} />

                  {/* {user?.rank === 'ADMIN' && (
                    <MenuItem
                      onClick={() => {
                        navigate('/control/marker')
                        handleCloseDrawer()
                      }}
                      sx={{ p: 2 }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Panorama />
                        <Typography textAlign="center">
                          {t('manage-project-page.title_markers')}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  )} */}
                  <MenuItem
                    onClick={() => {
                      navigate("/project");
                      handleCloseDrawer();
                    }}
                    sx={{ p: 2 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Article />
                      <Typography textAlign="center">{t("manage-project-page.title_my_project")}</Typography>
                    </Stack>
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      navigate(`/payment/${user?._id}`)
                      handleCloseDrawer()
                    }}
                    sx={{ p: 2 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Backpack />
                      <Typography textAlign="center">
                        {t('payment_page.title_p1')}
                      </Typography>
                    </Stack>
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      navigate("/recommend");
                      handleCloseDrawer();
                    }}
                    sx={{ p: 2 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Recommend />
                      <Typography textAlign="center">{t("goodimageAr_compo.title_p13")}</Typography>
                    </Stack>
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      navigate(`/payment/checking/${user?._id}`)
                      handleCloseDrawer()
                    }}
                    sx={{ p: 2 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Description />
                      <Typography textAlign="center">
                        {t('payment_page.title_p2')}
                      </Typography>
                    </Stack>
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleCloseDrawer();
                    }}
                    sx={{ p: 2 }}
                  >
                    <Stack direction="row" spacing={2}>
                      <LogoutSharp />
                      <Typography textAlign="center">{t("manage-project-page.title_logout")}</Typography>
                    </Stack>
                  </MenuItem>
                  <Divider variant="middle" sx={{ color: "#000000" }} />
                  <MenuItem>
                    <LanguageSelector lang={lang} switchLang={switchLang} />
                  </MenuItem>
                  <Divider variant="middle" sx={{ color: "#000000" }} />
                </Drawer>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialog open={openLoginDialog} handleClose={handleCloseLoginDialog} user={user} setToken={setToken} />
    </>
  );
};
