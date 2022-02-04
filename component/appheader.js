import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Toolbar, IconButton, AppBar } from "@mui/material";
import { Apps } from "@mui/icons-material";
import Link from "next/link";
import LoginMenu from "./loginmenu";

export default function AppHeader({ handleDrawerClose, handleDrawerOpen }) {
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            spacing={2}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs>
              <Link href="/">
                <img
                  src="/images/mobile-logo-reversed_75x27.png"
                  width="75"
                  height="27"
                />
              </Link>
            </Grid>
            <Grid item>
              <LoginMenu />
            </Grid>
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                size="large"
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
