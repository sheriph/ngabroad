import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../src/theme";

const styles = makeStyles((theme) => ({
  gridContainer: {
    height: "240px",
    [theme.breakpoints.up("sm")]: {
      height: "300px",
    },
    // minWidth: "80%",
    //  backgroundColor: "red",
  },
  gridItem: {
    height: "80%",
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "20px",
    padding: "10px",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: "90%",
    },
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

const IntroHeader = ({ title = "", subtitle = "" }) => {
  const classes = styles();
  return (
    <Container>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.gridContainer}
      >
        <Grid
          item
          container
          justify="center"
          alignContent="center"
          className={classes.gridItem}
        >
          <Grid item>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IntroHeader;
