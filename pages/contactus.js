import React from "react";
import { SleekTheme } from "../component/themes";
import ContactUs from "../component/contactuscomponent";




const ContactPage = () => {
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
