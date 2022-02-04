import React from "react";
import { SleekTheme } from "../component/themes";
import EmbassyComponent from "../component/embassycomponent";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

export default function () {

  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
  
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
