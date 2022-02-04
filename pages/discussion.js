import React from "react";
import DiscussionComponent from "../component/discussioncomponent";
import { SleekTheme } from "../component/themes";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

const Discussion = () => {

  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
  return (
    <SleekTheme

      subtitle="Get in touch"
      title="We love to hear from you"
      jsx={<DiscussionComponent />}
      pageTitle="Contact US"
      pageDesc="Contact US page"
      pageUrl="http://naijagoingabroad.com/contactus"
      page={true}
      isAmp={undefined}
    />
  );
};

export default Discussion;
