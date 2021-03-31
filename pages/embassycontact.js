// @ts-nocheck
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";
import EmbassyComponent from "../component/embassycomponent";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function () {
  return (
    <SleekTheme
      subtitle="All Embassies in Nigeria"
      title="Embassy Finder"
      jsx={<EmbassyComponent />}
      pageTitle="Embassy Contact"
      page={true}
      pageUrl="http://naijagoingabroad.com/embassycontact"
      pageDesc="List of embassies in Nigeria with full contact details"
    />
  );
}
