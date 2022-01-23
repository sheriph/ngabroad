// @ts-nocheck
import React from "react";
import { Apps } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Box,
  Paper,
  Stack,
} from "@mui/material";

/* const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
})); */

export default function AmpHeader() {
  // const classes = useStyles();

  return (
    <div>
      {/* <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
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
                sx={{ color: "white" }}
                aria-label="menu"
                component="button"
                on="tap:sidebar.toggle"
                className="sidebar-trigger"
                size="large">
                <Apps />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
    </div>
  );
}
