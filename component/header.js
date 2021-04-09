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
                      <Image
                        src="/images/desktop-logo-reversed_200x73_75.png"
                        alt="logo"
                        width="105"
                        height="38"
                        layout="intrinsic"
                      />
                    }
                  ></ButtonBase>
                </Link>
              </Grid>

              <Grid item>
                <Link passHref href="/">
                  <ButtonBase
                    className={classes.primaryHeaderButton}
                    component={Button}
                  >
                    HOME
                  </ButtonBase>
                </Link>
              </Grid>
              <Grid item>
                <Link passHref href="/articles">
                  <ButtonBase
                    className={classes.primaryHeaderButton}
                    component={Button}
                  >
                    ARTICLES
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
