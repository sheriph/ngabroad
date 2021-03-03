import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Homepage = () => {
  return <> The Homepage</>;
};

export default function () {
  return (
    <SleekTheme
      subtitle="Explore with us"
      title="Let's plan the trip of your dreams"
      jsx={<Homepage />}
      pageTitle="Homepage"
    />
  );
}
