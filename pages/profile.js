import React from "react";
import { SleekTheme } from "../component/themes";
import Homepage from "../component/homepagecomponent";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";
import ProfileComponent from "../component/profilecomponent";

const Index = () => {
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }

  return (
    <SleekTheme
      subtitle="Explore with us"
      title="Let's plan the trip of your dreams"
      jsx={<ProfileComponent />}
      pageTitle="Homepage"
      pageDesc="NGabroad Homepage | Your destination for all travel needs"
      pageUrl="http://naijagoingabroad.com/"
      page={true}
      isAmp={undefined}
    />
  );
};

export default Index;
