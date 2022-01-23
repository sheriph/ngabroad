import React from "react";
import { SleekTheme } from "../component/themes";
import EmbassyComponent from "../component/embassycomponent";




export default function () {
  return (
    <SleekTheme
      isAmp={undefined}
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
