// @ts-nocheck
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useAmp } from "next/amp";
import { makeStyles } from "@mui/styles";

const AmpSidebar = () => {
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      backgroundColor: "#ffffff",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    contact: {
      backgroundColor: "#5348dc",
      color: "#ffffff",
    },
  }));
  const classes = useStyles();

  const isAmp = useAmp();

  if (!isAmp) return <></>;

  return (
    <amp-sidebar
      id="sidebar"
      className="sidebar"
      layout="nodisplay"
      side="right"
    >
      {/* <div className={classes.root}>
        <Box>
          <div className={classes.drawerHeader}>
            <IconButton
              on="tap:sidebar.toggle"
              className="sidebar-trigger"
              component="button"
              size="large">
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Typography
            style={{ marginLeft: "20px", marginTop: "10px" }}
            gutterBottom
          >
            Menu
          </Typography>
          <ul style={{ listStyle: "none" }}>
            <li>
              <a style={{ textDecoration: "none" }} href="/articles">
                <Button>ARTICLES</Button>
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none" }} href="/contactus">
                <Button>CONTACT US</Button>
              </a>
            </li>
          </ul>
          <Divider />
          <Typography
            style={{ marginLeft: "20px", marginTop: "10px" }}
            gutterBottom
          >
            Get Visa Documents Online
          </Typography>
          <ul style={{ listStyle: "none" }}>
            <li>
              <a
                style={{ textDecoration: "none" }}
                href="/interactive-order-platform"
              >
                <Button>Travel Insurance</Button>
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                href="/interactive-order-platform"
              >
                <Button>Hotel Reservarion For Visa</Button>
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                href="/interactive-order-platform"
              >
                <Button>Application Form Filling</Button>
              </a>
            </li>
          </ul>

          <Divider />
          <Typography
            style={{ marginLeft: "20px", marginTop: "10px" }}
            gutterBottom
          >
            Travel Tools
          </Typography>
          <ul style={{ listStyle: "none" }}>
            <li>
              <a style={{ textDecoration: "none" }} href="/embassycontact">
                <Button>School Finder</Button>
              </a>
            </li>
            <li>
              <a style={{ textDecoration: "none" }} href="/studyabroad">
                <Button>Embassy Finder</Button>
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                href="/visa-eligibility-test"
              >
                <Button>Visa Eligibility Test</Button>
              </a>
            </li>
          </ul>

          <Divider />
          <Typography
            style={{ marginLeft: "20px", marginTop: "10px" }}
            gutterBottom
          >
            Contact NGabroad
          </Typography>
          <Grid container style={{ backgroundColor: "#5348dc" }}>
            <Grid item xs={12}>
              <ButtonBase
                component={Button}
                startIcon={<PhoneOutlined />}
                //    style={{ textDecoration: "none" }}
                style={{
                  textTransform: "none",
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                09065369929 | 08087164862
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <ButtonBase
                component={Button}
                startIcon={<EmailOutlined />}
                style={{
                  textTransform: "none",
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                info@naijagoingabroad.com
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <ButtonBase
                component={Button}
                startIcon={<LocationOnOutlined />}
                style={{
                  textTransform: "none",
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                65c Opebi Rd, Ikeja, Lagos
              </ButtonBase>
            </Grid>
          </Grid>
        </Box>
      </div> */}
      <p>hello sidebar</p>
    </amp-sidebar>
  );
};

export default AmpSidebar;
