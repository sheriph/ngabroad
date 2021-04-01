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
  Apps,
  MenuOpenOutlined,
  PhoneEnabledOutlined,
  PlayArrow,
  ScheduleOutlined,
} from "@material-ui/icons";
import Image from "next/image";
import DrawerMenu from "./drawermenu";
import AppHeader from "./appheader";
import Link from "next/link";

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

const MyHeader = () => {
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
          {/*   <Grid
              item
              container
              component={Container}
              className={classes.secondarymenu}
            >
              <Grid item xs="auto">
                <ButtonBase
                  component={Button}
                  startIcon={<EmailOutlinedIcon />}
                  className={classes.buttonbase}
                  size="small"
                >
                  info@naijagoingabroad.com
                </ButtonBase>
              </Grid>
              <Grid item xs="auto">
                <ButtonBase
                  component={Button}
                  startIcon={<PhoneEnabledOutlined />}
                  className={classes.buttonbase}
                  size="small"
                >
                  09065369929
                </ButtonBase>
              </Grid>
              <Hidden smDown>
                <Grid item xs="auto">
                  <ButtonBase
                    component={Button}
                    startIcon={<ScheduleOutlined />}
                    className={classes.buttonbase}
                    size="small"
                  >
                    Mon-Fri: 9:00AM – 6:00PM
                  </ButtonBase>
                </Grid>
              </Hidden>
            </Grid> */}
            <Grid
              item
              container
              alignItems="center"
              className={classes.primaryHeader}
            >
              <Grid item xs>
                <Link href="/">
                  <ButtonBase
                    className={classes.primaryHeaderButton}
                    component={Button}
                    startIcon={
                      <img
                        src="https://ngabroadimages.s3.eu-west-2.amazonaws.com/wp-content/uploads/20210330154050/new-logo-reversed_200x73_75.png"
                        width="105px"
                        height="38px"
                      />
                    }
                  ></ButtonBase>
                </Link>
              </Grid>

              <Grid item>
                <Link href="/">
                  <ButtonBase
                    className={classes.primaryHeaderButton}
                    component={Button}
                  >
                    Home
                  </ButtonBase>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/articles">
                  <ButtonBase
                    className={classes.primaryHeaderButton}
                    component={Button}
                  >
                    articles
                  </ButtonBase>
                </Link>
              </Grid>
              <Grid item>
                <ButtonBase
                  className={classes.primaryHeaderButton}
                  component={Button}
                  variant="outlined"
                  color="secondary"
                  endIcon={<Apps />}
                  onClick={handleDrawerOpen}
                >
                  MORE
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
