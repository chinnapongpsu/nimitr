import { Facebook } from "@mui/icons-material";
import { Grid, Typography, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterBox = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      item
      lg={12}
      sm={12}
      xs={12}
      sx={{
        padding: "20px",
        bgcolor: "#ffffff",
        color: "white",
        display: "flex",
        mt: 3,
      }}
    >
      {/* <Container maxWidth="lx"> */}
      {/* <Grid md={12} sx={{ my: 3 }}> */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src="/Logo_SS.png"
          sx={{
            maxWidth: "240px",
            width: "100%",
            height: "auto",
            backgroundSize: "cover",
            borderRadius: "10px",
          }}
        />
        <Typography
          sx={{
            mt: 2,
            color: "#000000",
            fontSize: {
              xs: "16px", // Define font size for extra-small screens
              sm: "16px", // Define font size for small screens
              md: "18px", // Define font size for medium screens
              lg: "20px", // Define font size for large screens
            },
          }}
        >
          {t("intro_page.title_p24")}
          <br />
          {t("intro_page.title_p20")}
          <br />
          {t("intro_page.title_p21")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mt: 11,
        }}
      >
        <Box
          component="img"
          src="/Logo_Sci.png"
          alt="Logo"
          sx={{
            maxWidth: "350px",
            width: "100%",
            height: "auto",
            backgroundSize: "cover",
          }}
        />
        <Typography
          sx={{
            color: "#000000",
            mt: 5,
            fontSize: {
              xs: "16px", // Define font size for extra-small screens
              sm: "16px", // Define font size for small screens
              md: "18px", // Define font size for medium screens
              lg: "20px", // Define font size for large screens
            },
          }}
        >
          {t("intro_page.title_p23")}
          <br /> {t("intro_page.title_p25")}
          <br /> {t("intro_page.title_p26")}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body"
          sx={{
            color: "#000000",
            mt: 2,
            textAlign: "center",
            fontWeight: 700,
            fontSize: "40px",
          }}
        >
          {t("intro_page.title_p27")}
          <br />
          <Typography sx={{ mt: 4 }}>
            {t("intro_page.title_p28")}
            <br /> {t("intro_page.title_p29")}
            <br /> {t("intro_page.title_p30")}
            <br />
            {t("intro_page.title_p31")}
          </Typography>
        </Typography>
        <a
          href="https://web.facebook.com/streamsouthtech"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // นำเส้นขีดใต้ออก
        >
          <Grid
            container
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <Facebook
              sx={{ width: "50px", height: "50px", color: "#4267B2" }}
            />

            <Typography sx={{ color: "#000000", fontWeight: 700 }}>
              Stream South Technology
            </Typography>
          </Grid>
        </a>
        <a
          href="https://nimitr.art/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // นำเส้นขีดใต้ออก
        >
          <Grid
            container
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <Typography sx={{ color: "#4267B2", fontWeight: 700 }}>
              Privacy Policy
            </Typography>
          </Grid>
        </a>
        <a
          href="https://nimitr.art/support"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // นำเส้นขีดใต้ออก
        >
          <Grid
            container
            alignItems="center"
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <Typography sx={{ color: "#4267B2", fontWeight: 700 }}>
              Help & Support
            </Typography>
          </Grid>
        </a>
      </Grid>

      <Grid
        container
        justifyContent="center" // Center the content horizontally
        sx={{ marginTop: "20px" }} // Add any additional styling if needed
      >
        <Grid item xs={11} lg={11}>
          <Divider
            variant="middle"
            sx={{ borderTop: "4px solid #FFD012", borderRadius: "5px" }}
          />
          <Typography
            sx={{
              color: "black",
              fontWeight: 700,
              my: 3,
              textAlign: "center",
            }}
          >
            © Copyright 2019. All Right Reserved. Stream South Technology Co.,
            Ltd.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FooterBox;
