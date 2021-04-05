// @ts-nocheck
import React from "react";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";



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
