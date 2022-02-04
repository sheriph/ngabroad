// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import FourOFourComponent from "../component/404";
import { useAmp } from "next/amp";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

export const config = { amp: false };

export default function FourOFour() {
  const isAmp = useAmp();

  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }

  return (
    <SleekTheme
      isAmp={isAmp}
      subtitle="Error 404 !!!"
      title="Page Not Found"
      jsx={<FourOFourComponent isAmp={isAmp} />}
      pageTitle="Page Not Found"
      pageDesc="Error 404 !!!"
      pageUrl="http://naijagoingabroad.com/studyabroad"
      page={true}
      seo
    />
  );
}
