import React from "react";
import MyHeader from "./header";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./footer";
import IntroHeader from "./introheader";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const SleekTheme = ({
  pageTitle = "",
  jsx = <></>,
  title = "",
  subtitle = "",
}) => {
  const classes = styles();
  return (
    <React.Fragment>
      <Container
        className={classes.baseContainer}
        disableGutters
        maxWidth={false}
      >
        <MyHeader pageTitle={pageTitle} />
        <IntroHeader title={title} subtitle={subtitle} />
      </Container>
      <Container >{jsx}</Container>
      <Container
        className={classes.baseContainer}
        disableGutters
        maxWidth={false}
      >
        <Footer />
      </Container>
    </React.Fragment>
  );
};
