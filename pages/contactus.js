// @ts-nocheck
import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import MyHeader from "../component/header";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "../component/footer";
import { SleekTheme } from "../component/themes";
import SinglePost from "../component/postcomponent";
import ContactUs from "../component/contactuscomponent";

const styles = makeStyles((theme) => ({
  baseContainer: {
    backgroundColor: theme.palette.primary.main,
  },
}));

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
    />
  );
};

export default ContactPage;
