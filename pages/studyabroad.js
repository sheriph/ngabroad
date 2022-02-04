import React from "react";
import { SleekTheme } from "../component/themes";
import StudyAbroadComponent from "../component/studyabroadcomponent";
import { useAmp } from "next/amp";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

export const config = { amp: "hybrid" };

export default function StudyAbroad() {
  const isAmp = useAmp();

  
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }

  return (
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
  );
}
