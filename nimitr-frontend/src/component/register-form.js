import { useMutation } from "@apollo/client";
import { Box, Button, DialogContent, DialogTitle, Grid, Stack, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import RegisterMember from "../graphql/mutations/register";
import SetPassword from "../graphql/mutations/setPassword";

import { NimitrTextField } from "./ui/text-field";

export const RegisterForm = ({ handleOnCloseDialog, handleStatusOpen, setErrorMessage, handleAlertErrorOpen }) => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [registerMember] = useMutation(RegisterMember);
  const [setPasswordMember] = useMutation(SetPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          handleStatusOpen();
          handleOnCloseDialog();
          // navigate('/')
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
      handleAlertErrorOpen(true);
    }
  };
  return (
    <Grid>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>{t("login_page.title_p7")}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid>
            <Typography variant="caption">{t("login_page.title_p2")}</Typography>
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
            <Typography variant="caption">{t("login_page.title_p3")}</Typography>
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
              <Typography variant="caption">{t("login_page.title_p8")}</Typography>
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
              <Typography variant="caption">{t("login_page.title_p9")}</Typography>
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
            <Typography variant="caption">{t("login_page.title_p10")}</Typography>
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
            <Typography variant="caption">{t("login_page.title_p11")}</Typography>
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
          <Button fullWidth variant="contained" type="submit" sx={{ my: 3 }}>
            {t("login_page.title_p7")}
          </Button>
        </Box>
      </DialogContent>
    </Grid>
  );
};

RegisterForm.propTypes = {
  handleOnCloseDialog: PropTypes.func.isRequired,
  handleStatusOpen: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  handleAlertErrorOpen: PropTypes.func.isRequired,
};
