// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import StudyAbroadComponent from "../component/studyabroadcomponent";
import { SnackbarProvider } from "notistack";


export default function StudyAbroad() {
  return (
    <SnackbarProvider maxSnack={3}>
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
    </SnackbarProvider>
  );
}
