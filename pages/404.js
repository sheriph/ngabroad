// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import FourOFourComponent from "../component/404";
import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

export default function FourOFour() {
  const isAmp = useAmp();

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
