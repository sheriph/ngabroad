// @ts-nocheck
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import Head from "next/head";
import React, { useState } from "react";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import {
  MenuOpenOutlined,
  PhoneEnabledOutlined,
  PlayArrow,
  ScheduleOutlined,
} from "@material-ui/icons";
import Image from "next/image";
import DrawerMenu from "./drawermenu";
import AppHeader from "./appheader";

const styles = makeStyles((theme) => ({
  buttonbase: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textTransform: "none",
  },
  secondarymenu: {
    backgroundColor: theme.palette.primary.dark,
    width: "max-content",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  primaryHeader: {
    //   width: "max-content",
  },
  primaryHeaderButton: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  svgroot: {
    transform: "rotate(90deg)",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const MyHeader = ({ pageTitle = "NaijaGoingAbroad" }) => {
  const [open, setOpen] = useState(false);
  const classes = styles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Container disableGutters>
      <Head>
        <title>
          {pageTitle !== "NaijaGoingAbroad"
            ? `${pageTitle} | NGabroad`
            : "NaijaGoingAbroad"}
        </title>
      </Head>
      <DrawerMenu
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleDrawerClose}
      />
      <Hidden xsDown>
        <Container>
          <Grid container justify="flex-end">
            <Grid
              item
              container
              component={Container}
              className={classes.secondarymenu}
            >
              <Grid item>
                <ButtonBase
                  component={Button}
                  startIcon={<EmailOutlinedIcon />}
                  className={classes.buttonbase}
                  size="small"
                >
                  info@naijagoingabroad.com
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase
                  component={Button}
                  startIcon={<PhoneEnabledOutlined />}
                  className={classes.buttonbase}
                  size="small"
                >
                  09065369929
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase
                  component={Button}
                  startIcon={<ScheduleOutlined />}
                  className={classes.buttonbase}
                  size="small"
                >
                  Mon-Fri: 9:00AM – 6:00PM
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              className={classes.primaryHeader}
            >
              <Grid item xs>
                <ButtonBase
                  className={classes.primaryHeaderButton}
                  component={Button}
                  startIcon={
                    <img
                      src="https://naijagoingabroad.com/wp-content/uploads/2021/01/new-logo-reversed_200x73_75.png"
                      width="105px"
                      height="38px"
                    />
                  }
                ></ButtonBase>
              </Grid>

              <Grid item>
                <ButtonBase
                  className={classes.primaryHeaderButton}
                  component={Button}
                >
                  home
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase
                  className={classes.primaryHeaderButton}
                  component={Button}
                >
                  articles
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase
                  className={classes.primaryHeaderButton}
                  component={Button}
                  variant="outlined"
                  color="secondary"
                  endIcon={<MenuOpenOutlined />}
                  onClick={handleDrawerOpen}
                >
                  TRAVEL RESOURCES
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Hidden>
      <Hidden smUp>
        <AppHeader
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </Hidden>
    </Container>
  );
};

export default MyHeader;
