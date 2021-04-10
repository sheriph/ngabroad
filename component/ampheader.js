// @ts-nocheck
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import { Apps } from "@material-ui/icons";

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
              <IconButton
                edge="start"
                //  className={classes.menuButton}
                // color="inherit"
                style={{ color: "white" }}
                aria-label="menu"
                component="button"
                on="tap:sidebar.toggle"
                className="sidebar-trigger"
              >
                <Apps />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
