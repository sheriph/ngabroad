// @ts-nocheck
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, Menu, MenuItem } from "@material-ui/core";
import { Apps, ContactPhoneOutlined, MenuOpen } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AmpHeader() {
  const classes = useStyles();
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <a style={{ textDecoration: "none" }} href="/">
                <span>
                  <amp-img
                    src="/images/mobile-logo-reversed_75x27.png"
                    width="75"
                    height="27"
                    alt="logo"
                    layout="fixed"
                  ></amp-img>
                </span>
              </a>
            </Grid>
            <Grid item>
              <a
                style={{ textDecoration: "none" }}
                href={`/${encodeURIComponent(pid)}`}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  // color="inherit"
                  style={{ color: "white" }}
                  aria-label="menu"
                >
                  <Apps />
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
