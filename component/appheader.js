import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid } from "@material-ui/core";
import { Apps, ContactPhoneOutlined, MenuOpen } from "@material-ui/icons";
import Link from "next/link";

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

export default function AppHeader({ handleDrawerClose, handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Link href="/">
                <img
                  src="https://ngabroadimages.s3.eu-west-2.amazonaws.com/wp-content/uploads/20210330154053/new-logo-reversed_75x27.png"
                  width="73"
                  height="27"
                />
              </Link>
            </Grid>
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
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
