// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import StudyAbroadComponent from "../component/studyabroadcomponent";
import { SnackbarProvider } from "notistack";
import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

export default function StudyAbroad() {
  const isAmp = useAmp();

  return (
    <SnackbarProvider maxSnack={3}>
      <SleekTheme
        isAmp={isAmp}
        subtitle="Find Schools and Study Programs"
        title="Study Abroad"
        jsx={<StudyAbroadComponent isAmp={isAmp} />}
        pageTitle="Study Abroad"
        pageDesc="Find study programs offered by universities around the world"
        pageUrl="http://naijagoingabroad.com/studyabroad"
        page={true}
        seo
      />
    </SnackbarProvider>
  );
}
