import React from "react";
import { SleekTheme } from "../component/themes";
import ContactUs from "../component/contactuscomponent";
import { useRecoilState } from "recoil";
import { showLogin_ } from "../state/recoil";
import LoginWrapper from "../component/loginwrapper";

const ContactPage = () => {

  const [showLogin, setShowLogin] = useRecoilState(showLogin_);

  if (showLogin) {
    return <LoginWrapper setShowLogin={setShowLogin} />;
  }
  return (
    <SleekTheme
      subtitle="Get in touch"
      title="We love to hear from you"
      jsx={<ContactUs />}
      pageTitle="Contact US"
      pageDesc="Contact US page"
      pageUrl="http://naijagoingabroad.com/contactus"
      page={true}
      isAmp={undefined}
    />
  );
};

export default ContactPage;
