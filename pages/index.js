// @ts-nocheck
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function () {
  return (
    <SleekTheme
      subtitle="Explore with us"
      title="Let's plan the trip of your dreams"
      jsx={<Homepage />}
      pageTitle="Homepage"
      pageDesc="NGabroad Homepage | Your destination for all travel needs"
      pageUrl="http://naijagoingabroad.com/"
      page={true}
    />
  );
}
