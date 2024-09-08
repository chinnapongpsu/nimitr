import { Redeem, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Stack,
  Container,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouteLink, useNavigate } from "react-router-dom";

import FooterBox from "../component/ui/introPage/footer";
import VideoCoverGrid from "../component/ui/introPage/videoDisplay";
import AuthContext from "../contexts/AuthContext";

export const HelpAndSupportPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Container sx={{ height: "100vh", mb: 50 }}>
        <Box
          sx={{
            padding: 5,
          }}
        >
          <Typography fontWeight="bold" variant="h3">
            Help & Support
          </Typography>
          <Typography
            sx={{ my: 5 }}
            fontWeight="bold"
            variant="h5"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontWeight: "bold" }}
            >
              1. How to use?
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle2">
                You can go to{" "}
                <a
                  href="https://nimitr.art/recommend"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Recommend Page
                </a>{" "}
                to see the instructions on how to use it.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ fontWeight: "bold" }}
            >
              2. How can I contact you?
            </AccordionSummary>
            <AccordionDetails>
              You can send an email to{" "}
              <a href="mailto: info@streamsouth.tech"> info@streamsouth.tech</a>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ fontWeight: "bold" }}
            >
              3. What is the price?
            </AccordionSummary>
            <AccordionDetails>
              You can start using it for free!!, but if you want to access all
              features, you can go to the
              <a
                href="https://nimitr.art/payment"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Payment Page
              </a>{" "}
              to view the packages.{" "}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
      <FooterBox />
    </>
  );
};
