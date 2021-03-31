// @ts-nocheck
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";
import EmbassyComponent from "../component/embassycomponent";
import StudyAbroadComponent from "../component/studyabroadcomponent";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function () {
  return (
    <SleekTheme
      subtitle="Find Schools and Study Programs"
      title="Study Abroad"
      jsx={<StudyAbroadComponent />}
      pageTitle="Study Abroad"
      pageDesc="Study Abroad"
      pageUrl="http://naijagoingabroad.com/studyabroad"
      page={true}
      seo
    />
  );
}
